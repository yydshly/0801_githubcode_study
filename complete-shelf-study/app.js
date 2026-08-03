const localSnapshotLink = document.querySelector(".local-upstream");
if (localSnapshotLink && ["localhost", "127.0.0.1"].includes(window.location.hostname)) {
  localSnapshotLink.hidden = false;
}
