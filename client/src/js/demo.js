const [fieldInput, setFieldInput] = useState(false);
 const [isInputVisible, setInputVisible] = useState(false);
 const [filter, setFilter] = useState('');
  const [trainsName] = useState([
    '11039 Maharashtra Exp',
    '2282 Puri Surat Weekly SF Express',
    '22828 Surat Puri Weekly SF Express',
    '22939 Hapa Bilaspur SF Express',
    '22137 Prerana Express',
    '22846 Hatia Pune SF Express',
    '2245 Pune Hatia SF Express',
    '18030 Shalimar Mumbai LTT (Kurla) Express.',
    '18029 Mumbai LTT Shalimar (Kurla) Express.',
    '13425 Malda Town Surat Express.',
    '13426 Surat Malda Town Express.',
    '22940 Bilaspur Hapa S Express.',
    '12106 Vidarbha SF Express',
    '12105 Vidarbha SF Express',
    '12136 Nagpur-Pune SF Express',
    '12135 Pune-Nagpur SF Express',
    '12849 Bilaspur Pune Sf Express'
  ]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
};
  const toggleDropdown = () => {
    setInputVisible(true);
};
  const toggleDropdown2 = () => {
    setInputVisible(false);
};
    const filteredOptions = trainsName.filter((option) =>
    option.toLowerCase().includes(filter.toLowerCase()),
);
  
 const handleTrainClick = (trainName) => {
    setSelectedTrains((prevSelectedTrains) => [
      ...prevSelectedTrains,
      trainName,
    ]);
};

 const handleTrainRemove = (nameToRemove) => {
    const updatedOptions = selectedTrains.filter(
      (option) => !option.toLowerCase().includes(nameToRemove.toLowerCase()),
    );
    setSelectedTrains(updatedOptions);
  };
  
const [selectedTrains, setSelectedTrains] = useState([]);

const addTrains = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedTrains,
    }));
  };

  useEffect(() => {
    addTrains();
  }, [selectedTrains]);


<div onClick={handleTypeClick} className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Type of Contract{' '}
                        <span className=" text-red-600 text-lg">*</span>
                      </label>
                      <select
                        name="typeofcontract"
                        value={formData.typeofcontract}
                        onChange={handleChange}
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      >
                        <option value="" disabled>
                          Type of Contract
                        </option>
                        <option
                          onClick={handleDynamicInput}
                          value="On board Catering"
                        >
                          On board Catering
                        </option>
                        <option
                          onClick={handleDynamicInput}
                          value="On board Non–Catering"
                        >
                          On board Non–Catering
                        </option>
                        <option onClick={handleStaticInput} value="PF permit">
                          PF permit
                        </option>
                        <option onClick={handleStaticInput} value="Static Unit">
                          Static Unit
                        </option>
                        <option onClick={handleStaticInput} value="Static Unit">
                          Parking
                        </option>
                        <option onClick={handleStaticInput} value="Static Unit">
                          Parcel Handling
                        </option>
                        <option onClick={handleStaticInput} value="Static Unit">
                          Station Cleaning
                        </option>
                      </select>
                    </div>
                  </div>
                  {fieldInput && (
                    <div>
                      <div className="w-full xl:w-1/2">
                        <label className="mb-2.5 block text-black dark:text-white">
                          Section Names{' '}
                          <span className=" text-red-600 text-lg">*</span>
                        </label>
                        <select
                          name="sectionname"
                          value={formData.sectionname}
                          onChange={handleChange}
                          className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                        >
                          {sectionName.map((item) => (
                            <option>{item}</option>
                          ))}
                        </select>
                      </div>

                      <div className="w-full gap-12 flex">
                        <div>
                          <p className="mb-2.5 block text-black dark:text-white pt-2">
                            Train List
                            <span className=" text-red-600 text-lg">*</span>
                          </p>
                          <div
                            // className="dropdown border border-red-300 px-3 py-2"
                            style={{
                              position: 'relative',
                              display: 'inline-block',
                            }}
                          >
                            <input
                              type="text"
                              value={filter}
                              // value={formData.trainList}
                              onChange={handleFilterChange}
                              //  onChange={handleChange}
                              className="w-[300px] rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              style={{
                                display: true ? 'inline-block' : 'none',
                              }}
                              onFocus={toggleDropdown}
                            />
                            {isInputVisible && (
                              <div
                                onMouseEnter={toggleDropdown}
                                onMouseLeave={toggleDropdown2}
                                className="dropdown-content"
                                style={{
                                  display: 'block',
                                  position: 'absolute',
                                  backgroundColor: '#f9f9f9',
                                  minWidth: '160px',
                                  boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
                                  zIndex: 1,
                                }}
                              >
                                {filteredOptions.map((option, index) => (
                                  <div
                                    key={index}
                                    onClick={() => handleTrainClick(option)}
                                    style={{
                                      color: 'black',
                                      padding: '12px 16px',
                                      textDecoration: 'none',
                                      display: 'block',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    {option}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        <div>
                          <p className="mb-1 block text-black dark:text-white pt-3">
                            Selected Trais{' '}
                            <span className=" text-red-600 text-lg">*</span>
                          </p>
                          {selectedTrains.map((item) => (
                            <p className=" flex align-middle items-center justify-between gap-3">
                              {item}{' '}
                              <MdOutlineCancel
                                className=" text-red-500"
                                onClick={() => handleTrainRemove(item)}
                              />
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}