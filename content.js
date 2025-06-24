const bookmarkImgURL = chrome.runtime.getURL("assets/bookmark.png");
const AZ_PROBLEM_KEY = "AZ_PROBLEM_KEY";

window.addEventListener("load", addBookmarkButton);

const observer = new MutationObserver(() => {
  addBookmarkButton();
});

observer.observe(document.body, { childList: true, subtree: true });

addBookmarkButton();

function onProblemsPage() {
  return window.location.pathname.startsWith("/problems/");
}

function addBookmarkButton() {
  console.log("triggering");
  if (!onProblemsPage() || document.getElementById("add-bookmark-button"))
    return;

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
  bookmarkButton.addEventListener("click", addNewBookmarkHandler);
}

async function addNewBookmarkHandler() {
  const currentBookmarks = await getCurrentBookmarks();
  const azProblemUrl = window.location.href;
  const uniqueId = extractUniqueId(azProblemUrl);
  const problemName = document.getElementsByClassName(
    "Header_resource_heading__cpRp1"
  )[0].innerText;

  if (currentBookmarks.some((bookmark) => bookmark.id == uniqueId)) return;

  const bookmarkObj = {
    id: uniqueId,
    name: problemName,
    url: azProblemUrl,
  };

  const updatedBookmarks = [...currentBookmarks, bookmarkObj];

  chrome.storage.sync.set({ AZ_PROBLEM_KEY: updatedBookmarks }, () => {
    console.log("updated the bookmarks correctly to ", updatedBookmarks);
  });
}

function extractUniqueId(url) {
  const pathParts = new URL(url).pathname.split("/");
  const problemId = pathParts.find(
    (part) => part !== "" && part !== "problems"
  );
  return problemId || null;
}

function getCurrentBookmarks() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([AZ_PROBLEM_KEY], (results) => {
      resolve(results[AZ_PROBLEM_KEY] || []);
    });
  });
}
