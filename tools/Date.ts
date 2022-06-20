export const now = () => {
  return new Date().toISOString().replace(/([^T]+)T([^\.]+).*/g, "$1 $2");
};
