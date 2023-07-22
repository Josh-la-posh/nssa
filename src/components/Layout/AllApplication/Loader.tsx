import LoaderIcon from '../../../assets/icons/loader.gif';

const Loader = () => {
  return (
    <div className="loader w-full flex justify-center h-20">
      <img src={LoaderIcon} alt="Loading ..." />
    </div>
  );
};

export default Loader;
