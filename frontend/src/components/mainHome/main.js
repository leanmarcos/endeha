
export async function connectAPI(e) {
    e.preventDefault();
    const userInput = document.getElementById('message');
    const userKey = document.getElementById('key');
    const result = document.getElementById('result');


    try {
        const response = await fetch('http://localhost:3000/api/encrypt/cesar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: userInput.value,
                amountpos: userKey.value
            })
        });

        if(!response.ok){
            const error = await response.json();
            result.innerHTML = `hubo un error en la request: ${error.error}`;
        }

        if(response.ok){
            const res = await response.json();
            result.innerHTML = `✅ Done: ${res.success}`;
            
        } else{
            console.log(error);
        }

    } catch (e) {

    }
}

