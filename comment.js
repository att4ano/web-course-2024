document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.querySelector(".preloader");
    const commentsContainer = document.getElementById("comments-container");

    async function fetchComments() {
        try {
            preloader.style.display = "block";
            const randomId = Math.random() > 0.5 ? 100 : 200;
            const filter = randomId === 100 ? "?id_gte=100&id_lte=105" : "?id_gte=200&id_lte=205";
            const response = await fetch(`http://jsonplaceholder.typicode.com/comments${filter}`);
            if (!response.ok) {
                throw new Error("Ошибка загрузки данных. Код: " + response.status);
            }
            const comments = await response.json();
            preloader.style.display = "none";
            if (comments.length > 0) {
                renderComments(comments);
            } else {
                commentsContainer.innerHTML = "<p>Нет доступных комментариев.</p>";
            }
        } catch (error) {
            preloader.style.display = "none";
            commentsContainer.innerHTML = `<p class="error">⚠ Что-то пошло не так: ${error.message}</p>`;
        }
    }

    function renderComments(comments) {
        commentsContainer.innerHTML = comments
            .map(
                (comment) => `
            <div class="comment">
                <h4>${comment.name} (${comment.email})</h4>
                <p>${comment.body}</p>
            </div>
        `
            )
            .join("");
    }

    fetchComments();
});
