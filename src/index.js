let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
 
  const addLikeButtonListeners = () => {
    const likeButtons = document.querySelectorAll(".like-btn");
    likeButtons.forEach(button => {
      button.addEventListener("click", handleLikeButtonClick);
    });
  };


  const handleLikeButtonClick = (event) => {
    const button = event.target;
    const toyCard = button.closest(".toy-card");
    const toyId = toyCard.dataset.id;
    const likesElement = toyCard.querySelector(".likes-count");
    const currentLikes = parseInt(likesElement.textContent);

    const newLikes = currentLikes + 1;

 
    fetch(`http://localhost:3000/toys/${toyId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: newLikes }),
    })
      .then(response => response.json())
      .then(updatedToy => {
       
        likesElement.textContent = updatedToy.likes;
      })
      .catch(error => {
        console.error("Error updating likes:", error);
      });
  };

  
  addLikeButtonListeners();
});
