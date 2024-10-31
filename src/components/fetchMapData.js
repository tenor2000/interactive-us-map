const fetchMapData = async () => {
  const response = await fetch("/us.svg");
  const svgText = await response.text();
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgText, "image/svg+xml");

  // Create a temporary hidden SVG container in the DOM
  const tempSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  tempSvg.setAttribute(
    "style",
    "position: absolute; width: 0; height: 0; overflow: hidden;"
  );
  document.body.appendChild(tempSvg);

  // Parse paths and calculate bounding boxes
  const pathData = Array.from(svgDoc.querySelectorAll("path")).map((path) => {
    const clonedPath = path.cloneNode(true); // Clone to avoid altering the original
    tempSvg.appendChild(clonedPath); // Append to SVG for rendering

    const bbox = clonedPath.getBBox(); // Now we can get accurate `getBBox` data

    const pathInfo = {
      id: path.getAttribute("id"),
      pathData: path.getAttribute("d"),
      labelX: bbox.x + bbox.width / 2,
      labelY: bbox.y + bbox.height / 2,
    };

    tempSvg.removeChild(clonedPath); // Clean up by removing the cloned path
    return pathInfo;
  });

  // Remove the temporary SVG container
  document.body.removeChild(tempSvg);

  return pathData;
};

export default fetchMapData;
