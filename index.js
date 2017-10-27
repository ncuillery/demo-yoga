const blessed = require('blessed');
const yoga = require('yoga-layout');
const { Node } = yoga;


// ############ Blessed ############
// Screen configuration
const screen = blessed.screen();
screen.key(['escape', 'q', 'C-c'], () => process.exit(0));

// Create the boxes
[0, 1, 2, 3, 4].forEach(index => {
  const box = blessed.box({
    width: 20,
    height: 10,
    content: (index + 1).toString(),
    border: {
      type: 'line'
    }
  });

  screen.append(box)
});

// ############ Yoga ############
// Root node
const screenNode = Node.create();
screenNode.setDisplay(yoga.DISPLAY_FLEX);
screenNode.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
screenNode.setJustifyContent(yoga.JUSTIFY_SPACE_AROUND);
screenNode.setFlexWrap(yoga.WRAP_WRAP);

// Box nodes
[0, 1, 2, 3, 4].forEach(index => {
  const boxNode = Node.create();
  boxNode.setWidth(20);
  boxNode.setHeight(10);

  screenNode.insertChild(boxNode, index);
});


// ############ rendering ############
function render() {
  const width = process.stdout.columns;
  const height = process.stdout.rows;
  screenNode.calculateLayout(width, height);

  screen.children.forEach((box, index) => {
    const boxNode = screenNode.getChild(index);
    box.position.top = boxNode.getComputedTop();
    box.position.left = boxNode.getComputedLeft();
  });

  screen.realloc();
  screen.render();
}

screen.on('resize', render);
render();

