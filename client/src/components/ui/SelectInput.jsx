import ReactSelect from "react-select"

export default function SelectInput(props) {
    const height = props.height || "36px";
   
    return (

        <ReactSelect
            {...props}
            menuPlacement="auto"
            components={{
                IndicatorSeparator: () => null,
            }}
            styles={{
                control: (provided, state) => ({
                    ...provided,
                    fontSize: "1.3rem",
                    borderRadius: "8px",
                    borderColor: "#bdb8b3",
                    boxShadow: "none",
                    "&:hover": {
                        border: "1px solid ##FBEFDA",
                    },
                    minHeight: height,
                    height,
                    backgroundColor: "#fff",
                    cursor: "pointer",
                    position: "relative",
                    border: props.noBorder && "none"

                }),
                placeholder: (provided, state) => ({
                    ...provided,
                    color: "#000", 
                  }),
                option: (provided, state) => ({
                    ...provided,
                    fontSize: "1.3rem",
                    cursor: "pointer",
                    color:"black",
                    backgroundColor: state.isSelected
                        ? "#F3CF96"
                        : state.isFocused
                            ? "#FBEFDA"
                            : "#fff",
                }),
                menu: (provided) => ({
                    ...provided,
                    borderRadius: "8px",
                    overflow: "hidden",
                    zIndex: 9999,
                }),
                singleValue: (provided, state) => ({
                    ...provided,
                    color: state.isDisabled ? "#716c69" : "#20262e",
                }),
                
                dropdownIndicator: (base) => ({
                    ...base,
                    color: 'black', 
                    '& svg': {
                      fill: 'black', 
                      scale: '0.8',
                    },
                  }),
                 

                valueContainer: (provided) => ({
                    ...provided,
                    height,
                    padding: "0 0 0 5px",
                }),
                input: (provided) => ({
                    ...provided,
                    height,
                    margin: "0px",
                    padding: "0px",
                }),
                indicatorSeparator: () => ({
                    display: "none",
                }),
                indicatorsContainer: (provided) => ({
                    ...provided,
                    height,

                }),
            }}
        />
    )
}

