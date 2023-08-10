const articletxt=document.getElementById('article-txt');
const submitbutton=document.getElementById('submit');
const summarytxt=document.querySelector('.summary-text');
const wordsCount = document.getElementById('words_count');

submitbutton.addEventListener('click', async()=>{
    console.log(articletxt.value);
    try{
        const options={
            method:"POST",
            headers:{
                "Content-type": "application/json"
            },
            body:JSON.stringify({article:articletxt.value})
        }
        var response=await fetch('/summary', options)
        var responsedata=await response.json();
        // summarytxt.textContent = responsedata.summary;
        // wordsCount.innerHTML = responsedata.words_count;
        console.log(responsedata);

        const summary=responsedata.summary;
        const wordscountvalue=responsedata.words_count
        function typeSummary(index){
            if(index<summary.length)
            {
                const currentText = summary.substring(0, index+1);
                summarytxt.textContent = currentText;
                setTimeout(function(){
                    typeSummary(index+1);
                },50);
            }
            else{
                wordsCount.innerHTML +=wordscountvalue;
            }
        }
        typeSummary(0);
    }
    catch(error){
       console.log(error);
    }
})