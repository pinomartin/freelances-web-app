const customStyles = () => {
    return {
      option: (provided: any) => ({
        ...provided,
        color: "#11ece5",
      }),
      control: (provided: any) => ({
        ...provided,
        color: "#11ece5",
        backgroundColor: "#2b3566",
        border: "none",
      }),
      singleValue: (provided: any) => ({
        ...provided,
        color: "#11ece5",
      }),

      input: (provided: any) => ({
        ...provided,
        color: "#11ece5",
      }),
    };
  };

  const customTheme = (theme: any) => {
    return {
      ...theme,
      colors: {
        ...theme.colors,
        neutral0: "#2b3566",
        primary25: "#a47dff",
        primary: "#8c5cfd",
      },
    };
  };

  export {customStyles, customTheme}