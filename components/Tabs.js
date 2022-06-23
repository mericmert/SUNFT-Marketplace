import React from "react";
import ExploreCollection from "./ExploreCollection";

const Tabs = ({ categories }) => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 px-8 flex-row"
            role="tablist"
          >

            {
              JSON.parse(categories).map((category, idx) => (
                  <li className="-mb-px mr-2 last:mr-0 flex-auto text-center" key={`category-tab-${idx}`}>
                    <a
                        className={
                            "text-xl font-bold px-5 py-3 shadow-md rounded block leading-normal " +
                            (openTab === idx+1
                                ? "text-white border-b-4 border-primary-color-4"
                                : "text-gray-400 hover:text-white")
                        }
                        onClick={e => {
                          e.preventDefault();
                          setOpenTab(idx+1);
                        }}
                        data-toggle="tab"
                        href={`#link${idx + 1}`}
                        role="tablist"
                    >
                      <i className="fas fa-space-shuttle text-lg mr-1"></i> {category.name}
                    </a>
                  </li>
              ))
            }
          </ul>
        {/* CONTENT */}



          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 px-4 text-white">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                {
                  JSON.parse(categories).map((category, idx) => (
                      <div className={openTab === idx+1 ? "block" : "hidden"} id={`link${idx+1}`} key={`link${idx+1}`}>
                        <ExploreCollection categoryName={category.name}/>
                      </div>
                  ))
                }

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tabs;