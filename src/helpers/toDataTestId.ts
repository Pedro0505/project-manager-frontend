export const toDataTestId = (content: string) => (
  content.replace(/ /g, '-').toLowerCase()
);
