document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.querySelector(".preloader");
    const commentsContainer = document.getElementById("comments-container");

    async function fetchComments() {
        try {
            preloader.style.display = "block";
            const randomId = Math.random() > 0.5 ? 100 : 200;
            const filter = randomId === 100 ? "?id_gte=100&id_lte=105" : "?id_gte=200&id_lte=210";
            const response = await fetch(`http://jsonplaceholder.typicode.com/comments${filter}`);
            if (!response.ok) {
                throw new Error("Ошибка загрузки данных. Код: " + response.status);
            }
            const comments = await response.json();
            preloader.style.display = "none";
            if (comments.length > 0) {
                renderComments(comments);
            } else {
                const noCommentsMessage = document.createElement("p");
                noCommentsMessage.textContent = "Нет доступных комментариев.";
                commentsContainer.appendChild(noCommentsMessage);
            }
        } catch (error) {
            preloader.style.display = "none";
            const errorMessage = document.createElement("p");
            errorMessage.classList.add("error");
            errorMessage.textContent = `⚠ Что-то пошло не так: ${error.message}`;
            commentsContainer.appendChild(errorMessage);
        }
    }

    function renderComments(comments) {
        comments.forEach(comment => {
            const commentElement = document.createElement("div");
            commentElement.classList.add("comment");

            const titleElement = document.createElement("h4");
            titleElement.textContent = `${comment.name} (${comment.email})`;

            const bodyElement = document.createElement("p");
            bodyElement.textContent = comment.body;

            commentElement.appendChild(titleElement);
            commentElement.appendChild(bodyElement);
            commentsContainer.appendChild(commentElement);
        });
    }

    fetchComments();
});
