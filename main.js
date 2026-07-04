const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            const counter = entry.target;
            const target = +counter.dataset.target;

            let count = 0;

            const updateCounter = () => {

                const increment = target / 60;

                if(count < target){

                    count += increment;

                    if(target === 49){
                        counter.innerText =
                            (count/10).toFixed(1) + "★";
                    }
                    else{
                        counter.innerText =
                            Math.ceil(count) + "+";
                    }

                    requestAnimationFrame(updateCounter);
                }
                else{

                    if(target === 49){
                        counter.innerText = "4.9★";
                    }
                    else{
                        counter.innerText = target + "+";
                    }
                }
            };

            updateCounter();

            observer.unobserve(counter);
        }

    });

},{
    threshold:0.5
});

counters.forEach(counter=>{
    observer.observe(counter);
});