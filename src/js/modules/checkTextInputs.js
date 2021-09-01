const checkTextInputs = (selector) =>{
    const textTextInputs = document.querySelectorAll(selector);

    console.log(textTextInputs);
    textTextInputs.forEach(
        item=>{
            item.addEventListener( 'keypress', function (e){
                if(e.key.match(/[^а-я 0-9]/ig)){
                    e.preventDefault();
                }
            });
        });
}
export default checkTextInputs;