import React from "react";
import './form.css'

const Form = ({showForm, toggleForm, handleSubmit, isOnList, isValidUrl, inputRef, setInputValue, inputValue, isError}) => {

  const handleChange = () => {
    setInputValue(inputRef.current.value)
  };

  const handlePasteUrl = async () => {
    const text = await navigator.clipboard.readText();
    setInputValue(text);
  };

  const inputFocus = () => {
    inputRef.current.focus();
  };

  if (showForm) inputFocus();

  return (
    <>
      <form onSubmit={handleSubmit} className={showForm ? 'show url-form' : 'hide url-form'}>
        <div className="searchBar">
          <input
            placeholder={
              isOnList
                ? "This song is on the list"
                : isValidUrl
                ? "Provided url is not Youtube link"
                : isError
                  ? "Unexpected error"
                  : "YouTube link"
            }
            required
            ref={inputRef}
            type="url"
            className={isOnList || isValidUrl || isError ? "error-placeholder input" : "input"}
            onChange={handleChange}
            value={inputValue}
            onClick={handlePasteUrl}
          />
          <i className="bi bi-search search-icon"/>
        </div>
      </form>
      <div className={showForm ? "form-mask show-form-mask" : "form-mask"} onClick={() => toggleForm()}/>
    </>
  );
};
export default Form;

