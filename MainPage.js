
function scrollGacha(direction) {
    const slider = document.getElementById("Slider");
    const imageWidth = slider.clientWidth;

    slider.scrollBy({
        left: direction === "left" ? -imageWidth : imageWidth,
        behavior: "smooth"
    });
}

document.querySelectorAll("#Slider img").forEach(img => {
    img.addEventListener("click", () => {
        window.location.href = "gachaiplay.html";
    });
});

