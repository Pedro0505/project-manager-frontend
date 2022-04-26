Cypress.Commands.add('dragAndDrop', (subject: RegExp, target: RegExp) => {
  Cypress.log({
    name: "Drag'n'Drop",
    message: `Dragging element ${subject} to ${target}`,
    consoleProps: () => ({ subject, target }),
  });

  const BUTTON_INDEX = 0;
  const SLOPPY_CLICK_THRESHOLD = 10;

  cy.contains<HTMLElement>(target).then(($target) => {
    const coordsDrop = $target[0].getBoundingClientRect();

    cy.contains<HTMLElement>(subject).then(($subject) => {
      const coordsDrag = $subject[0].getBoundingClientRect();

      cy.wrap($subject)
        .trigger('mousedown', {
          button: BUTTON_INDEX,
          clientX: coordsDrag.x,
          clientY: coordsDrag.y,
          force: true,
        })
        .trigger('mousemove', {
          button: BUTTON_INDEX,
          clientX: coordsDrag.x + SLOPPY_CLICK_THRESHOLD,
          clientY: coordsDrag.y,
          force: true,
        });

      cy.get('body')
        .trigger('mousemove', {
          button: BUTTON_INDEX,
          clientX: coordsDrop.x,
          clientY: coordsDrop.y,
          force: true,
        })
        .trigger('mouseup');
    });
  });
});

export {};
