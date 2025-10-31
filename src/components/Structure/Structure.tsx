import Header from '../Header/Header';
import HeaderMobile from '../Header/HeaderMobile';
import './Structure.scss';

interface StructureProps {
  children: React.ReactNode;
}

const Structure: React.FC<StructureProps> = ({ children }) => {
  return (
    <div className="structure-del-main">
      <Header />
      <HeaderMobile />

      <main className="contenedor">
        <div className="desarrollo">{children}</div>
      </main>
    </div>
  );
};

export default Structure;