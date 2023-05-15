import PDF from '../../../assets/images/app/pdf.png';

type FormProps = {
  children: React.ReactNode;
  style: any;
  to: string;
};

// SIGN IN

export const ApplicationForm = ({ style, to }: FormProps) => {
  return (
    <div style={style}>
      <form action="" className="">
        <div className="mb-8">
          <label htmlFor="" className="text-400-16 text-darkText">
            School Name
          </label>
          <div className="text-inputText border border-borderColor pl-3 py-2">
            Divine Heritage International Group of Schools
          </div>
        </div>
        <div className="mb-8 flex gap-11 w-full">
          <div className="flex-1">
            <label htmlFor="" className="text-400-16 text-darkText">
              School Address
            </label>
            <div className="text-inputText border border-borderColor pl-3 py-2">
              Molete Center, Alausa, Ibadan
            </div>
          </div>
          <div className="flex-1">
            <label htmlFor="" className="text-400-16 text-darkText">
              School Phone Number
            </label>
            <div className="text-inputText border border-borderColor pl-3 py-2">08123456789</div>
          </div>
        </div>
        <div className="mb-8 flex gap-11">
          <span className="text-400-16">Use admin details for school owner's informaton</span>
        </div>
        <div className="mb-8 flex gap-11">
          <div className="flex-1">
            <label htmlFor="" className="text-400-16 text-darkText">
              School Owner's Name
            </label>
            <div className="text-inputText border border-borderColor pl-3 py-2">
              Mr. Adelaja Femi
            </div>
          </div>
          <div className="flex-1">
            <label htmlFor="" className="text-400-16 text-darkText">
              School Owner's Email Address
            </label>
            <div className="text-inputText border border-borderColor pl-3 py-2">
              delajafem23@gmail.com
            </div>
          </div>
        </div>
        <div className="mb-8 flex gap-11">
          <div className="flex-1">
            <label htmlFor="" className="text-400-16 text-darkText">
              City
            </label>
            <div className="text-inputText border border-borderColor pl-3 py-2">Ibadan</div>
          </div>
          <div className="flex-1">
            <label htmlFor="" className="text-400-16 text-darkText">
              State
            </label>
            <div className="text-inputText border border-borderColor pl-3 py-2">Oyo</div>
          </div>
        </div>
        <div className="">
          <label htmlFor="file" className="text-400-16 text-darkText">
            Documents
            <div className="flex gap-12 justify-center items-center mt-4">
              <div className="flex-1 flex gap-6 border border-greyLight pt-5 pb-8 pl-3 place-items-end">
                <img src={PDF} alt="" />
                <div className="">
                  <p className="text-18 font-600 mb-2" style={{ color: '#333333' }}>
                    School Registration Certificate
                  </p>
                  <div className="flex">
                    <span className="text-12 font-400 text-inputText mr-auto">
                      Size: <span style={{ color: '#FFB73E' }}>5MB</span>
                    </span>
                    <span className="text-12 font-400" style={{ color: '#0DB153' }}>
                      Download File
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex-1 flex gap-6 border border-greyLight pt-5 pb-8 pl-3 place-items-end">
                <img src={PDF} alt="" />
                <div className="">
                  <p className="text-18 font-600 mb-2" style={{ color: '#333333' }}>
                    School Registration Certificate
                  </p>
                  <div className="flex">
                    <span className="text-12 font-400 text-inputText mr-auto">
                      Size: <span style={{ color: '#FFB73E' }}>5MB</span>
                    </span>
                    <span className="text-12 font-400" style={{ color: '#0DB153' }}>
                      Download File
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </label>
        </div>
      </form>
    </div>
  );
};
