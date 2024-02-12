import { useState, useContext } from "react";
import { FormModalContext } from "../../context/FormModalContext";
import Button from "../Button/Button";
import Close from "../Icon/Close";

export default function SelectColumnsModal({
  buttonLabel,
  formLabel,
  children,
  totalColumns,
  CustomButton,
  name,
  //   onClickAddition = () => {},
  values = [],
}) {
  const { isOpen, setIsOpen, setFormData, formData } = useContext(FormModalContext);

  const [checkedData, setCheckedData] = useState(() =>
    formData[name] && typeof formData[name] != "string" ? formData[name] : {}
  );

  return (
    <>
      {CustomButton ? (
        <CustomButton onClick={() => setIsOpen(true)} notButton={true}>
          {buttonLabel}
        </CustomButton>
      ) : (
        <Button onClick={() => setIsOpen(true)} notButton={true}>
          {buttonLabel}
        </Button>
      )}
      <div
        onClick={() => setIsOpen(false)}
        className={`${
          isOpen ? "block" : "hidden"
        } z-40 fixed inset-0 w-screen h-screen bg-gray/60 transition duration-300`}
      ></div>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } text-black/70 z-50 fixed left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2`}
      >
        <div className="relative bg-white z-50 rounded-md shadow px-4 py-3 w-[700px] mx-auto flex flex-col transition duration-300 overflow-x-hidden cursor-auto">
          <div className="pb-2 mb-4">
            <div className="flex justify-between items-center relative">
              <h4 className="font-medium relative z-50">{formLabel}</h4>
              <Close onClick={() => setIsOpen(false)} />
            </div>
            <div className="h-[1px] bg-gray/30 w-full absolute left-0 mt-2"></div>
          </div>
          <div className="pb-2 mb-4">
            <div className="flex flex-col justify-between relative">
              <h4 className="font-medium relative z-50 mb-2">Stats</h4>
              <div className="grid grid-cols-2">
                <p>Total Columns in Dataset</p>
                <p>{totalColumns}</p>
              </div>
            </div>
            <div className="h-[1px] bg-gray/30 w-full absolute left-0 mt-2"></div>
          </div>
          {children}

          <div className="pb-2 mb-4">
            <div className="grid grid-cols-2 mb-2">
              <h4 className="font-medium relative z-50 mb-2">Columns</h4>
            </div>
            <div className="h-full max-h-[calc(100vh-25rem)] overflow-y-auto">
              {values.map((value) => (
                <div key={value} className="flex items-center gap-2 mb-4">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="absolute peer inset-0 w-full h-full opacity-0"
                      id={value}
                      name={value}
                      checked={checkedData[value] ? true : false}
                      onChange={() =>
                        setCheckedData((checkedData) => {
                          return {
                            ...checkedData,
                            [value]: checkedData[value] ? false : true,
                          };
                        })
                      }
                    />
                    <div className="w-4 h-4 peer-checked:bg-gradient-to-r from-lightblue to-blue rounded-sm border-lightblue border-[1.5px] ring-offset-0 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="currentColor"
                        className="bi bi-check2"
                        viewBox="0 0 16 16"
                        stroke="white"
                        strokeWidth="1.5"
                      >
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                      </svg>
                    </div>
                  </div>
                  <label htmlFor={value}>{value}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-5 mt-2">
            <div className="h-[1px] bg-gray/30 w-full absolute left-0 mt-2"></div>
          </div>
          <div className="place-self-end flex gap-2">
            <div className="cursor-pointer">
              <Button variant="secondary" onClick={() => setIsOpen(false)} notButton={true}>
                Cancel
              </Button>
            </div>
            <div className="cursor-pointer">
              <Button
                isLoading={false}
                notButton={true}
                onClick={() => {
                  setIsOpen(false);
                  //   onClickAddition();
                  setFormData((previous) => ({
                    ...previous,
                    [name]: checkedData,
                  }));
                }}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
