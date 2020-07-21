figma.showUI(__html__, { height: 450 });

function clone(val) {
	return JSON.parse(JSON.stringify(val))
}

figma.ui.onmessage = data => {
	const nodes: SceneNode[] = [];

	for (let i = 0; i < data.number_of_steps; i++) {
		const circle = figma.createEllipse();

		if (data.direction === 'vertical') {
			circle.y = (i * data.size) + (data.spacing * i);
		} else {
			circle.x = (i * data.size) + (data.spacing * i);
		}

		circle.resize(data.size, data.size);

		if (i === data.active_step - 1) {
			circle.fills = [
				{
					type: 'SOLID',
					color: { r: 0.11373, g: 0.79216, b: 0.58039 }
				}
			];
		} else {
			circle.fills = [
				{
					type: 'SOLID',
					color: { r: 0.41569, g: 0.45882, b: 0.50196 }
				}
			];
		}

		figma.currentPage.appendChild(circle);
		nodes.push(circle);

		figma.loadFontAsync({ family: "Roboto", style: "Regular" })
			.then(() => {
				const text = figma.createText();
				text.characters = '' + (i + 1);

				if (data.direction === 'vertical') {
					text.y = ((data.size - text.height) / 2)
						+ ((data.spacing * i)
						+ (data.size * i));

					text.x = ((data.size - text.width) / 2);
				} else {
					text.x = ((data.size - text.width) / 2)
						+ ((data.spacing * i)
						+ (data.size * i));

					text.y = ((data.size - text.height) / 2);
				}

				const fills = clone(text.fills);
				fills[0].color = { r: 1, g: 1, b: 1 };
				text.fills = fills;

				figma.currentPage.appendChild(text);
				nodes.push(text);
			});

		if (i !== data.number_of_steps - 1) {
			const line = figma.createLine();

			if (data.direction === 'vertical') {
				line.y = ((i + 1) * data.size) + (data.spacing * i);
				line.x = data.size / 2;
				line.rotation = -90;
			} else {
				line.x = ((i + 1) * data.size) + (data.spacing * i);
				line.y = data.size / 2;
			}

			line.strokes = [
				{
					type: 'SOLID',
					color: { r: 0.80784, g: 0.83137, b: 0.85490 }
				}
			];

			line.resize(data.spacing, 0);

			figma.currentPage.appendChild(line);
			nodes.push(line);
		}
	}

	figma.currentPage.selection = nodes;
	figma.viewport.scrollAndZoomIntoView(nodes);

	figma.closePlugin();
};
