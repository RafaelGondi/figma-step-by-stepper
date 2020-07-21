figma.showUI(__html__);

function clone(val) {
	return JSON.parse(JSON.stringify(val))
}

figma.ui.onmessage = data => {
	if (data.type === 'create-steps') {
		const nodes: SceneNode[] = [];
		for (let i = 0; i < data.number_of_steps; i++) {
			const circle = figma.createEllipse();
			circle.resize(28, 28);
			circle.x = (i * 28) + (48 * i);;
			circle.fills = [{ type: 'SOLID', color: { r: 0.41569, g: 0.45882, b: 0.50196 } }];

			figma.currentPage.appendChild(circle);
			nodes.push(circle);

			figma.loadFontAsync({ family: "Roboto", style: "Regular" })
				.then(() => {
					const text = figma.createText();
					text.characters = '' + (i + 1);

					text.x = ((28 - text.width) / 2)
						+ ((48 * i)
							+ (28 * i));

					text.y = ((28 - text.height) / 2);

					const fills = clone(text.fills);
					fills[0].color = { r: 1, g: 1, b: 1 };
					text.fills = fills;

					figma.currentPage.appendChild(text);
					nodes.push(text);
				});

			if (i !== data.number_of_steps - 1) {
				const line = figma.createLine();

				if (data.direction === 'vertical') {
					line.y = ((i + 1) * 28) + (48 * i);
					line.x = 28 / 2;
					line.rotation = -90;
				} else {
					line.x = ((i + 1) * 28) + (48 * i);
					line.y = 28 / 2;
				}

				line.strokes = [{ type: 'SOLID', color: { r: 0.80784, g: 0.83137, b: 0.85490 } }];
				line.resize(48, 0);

				figma.currentPage.appendChild(line);
				nodes.push(line);
			}

		}

		figma.currentPage.selection = nodes;
		figma.viewport.scrollAndZoomIntoView(nodes);
	}

	figma.closePlugin();
};
