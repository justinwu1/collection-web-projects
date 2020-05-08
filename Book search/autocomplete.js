// This file auto generate autocomplete input and a corresponding menu
// Root = where to generate, renderOption = What menu to display
// OnOptionSelect = Show the contents, inputValue = return the input value to the input field
// FetchData = api data fetch request
const createAutocomplete = ({
    root,
    renderOption,
    onOptionSelect,
    inputValue,
    fetchData
} ) => {
// Boiler plate for generating an input
root.innerHTML = `
    <div>
    <label class = "has-text-grey-dark"><b> Search For a Book </b></label>
    </div>
    <div>
    <input class = "input is-info" > 
    </div>
    <div class = "dropdown">
        <div class = "dropdown-menu">
            <div class = "dropdown-content results"></div>
        </div>
    </div>
`;
const input = root.querySelector('input');
const dropdown = root.querySelector('.dropdown');
const results = root.querySelector('.results');

// Fetch Data
const onInput = async event => {
    const items = await fetchData(event.target.value);
    const buttons = document.querySelectorAll('.is-hidden');
    console.log(items);
    dropdown.classList.add('is-active');
    results.innerHTML = "";
    for (let item of items) {

        // Show the contents of the menu and close it if clicks
        const option = document.createElement('a');
        option.classList.add('dropdown-item');
        option.innerHTML = renderOption(item);
        option.addEventListener('click', event => {
            dropdown.classList.remove('is-active');
            for(let i = 0; i < buttons.length; i++){
                buttons[i].classList.remove('is-hidden'); // Generates buttons
            }
            input.value = inputValue(item);
            onOptionSelect(item);

        });
        results.appendChild(option);
    }
    

}

input.addEventListener('input', debounceFunc(onInput, 500));
// Close the menu if clicked somewhere else beside the menu and the input
document.addEventListener('click', event => {
    if (!root.contains(event.target)) {
        dropdown.classList.remove('is-active');
    };
});
}