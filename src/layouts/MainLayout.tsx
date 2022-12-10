type Props = {
  children: React.ReactNode;
};
const MainLayout = ({ children }: Props) => {
  return (
    <div
      className={`bg-blue-500 min-h-screen py-4 bg-gradient-to-tr from-sky-500 to-blue-400 `}
    >
      {children}
    </div>
  );
};
export default MainLayout;
