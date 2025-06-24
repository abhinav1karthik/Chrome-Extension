const bookmarkImgURL = chrome.runtime.getURL("assets/bookmark.png");
const AZ_PROBLEM_KEY = "AZ_PROBLEM_KEY";
window.addEventListener("load", addBookmarkButton);

function addBookmarkButton() {
  const bookmarkButton = document.createElement("img");
  bookmarkButton.id = "add-bookmark-button";
  bookmarkButton.src = bookmarkImgURL;
  bookmarkButton.style.height = "30px";
  bookmarkButton.style.width = "30px";
  bookmarkButton.style.cursor = "pointer";
  bookmarkButton.alt = "Bookmark Problem";
  const container = document.querySelector(
    "div.ant-row.d-flex.gap-4.mt-1.css-19gw05y"
  );
  if (container) {
    container.appendChild(bookmarkButton);
  } else {
    console.warn("Bookmark container not found");
  }
  bookmarkButton.addEventListener("click", () => {
    alert("bookmark successful");
  });
}
