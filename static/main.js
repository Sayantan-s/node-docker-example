let deletes = document.getElementsByClassName("delete");
for(let i = 0; i< deletes.length; i++){
    deletes[i].addEventListener("click",() => {
        const slug = deletes[i].getAttribute('name');
        fetch(`/delete`,{
            method : 'POST',
            headers :{
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                name : slug
            })
        })
        window.location.href = "/delete"
    })
}