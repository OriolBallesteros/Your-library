$(document).ready(function () {

    $.ajax({
        url: "https://api.myjson.com/bins/udbm5",

        success: function (json) {
            $(".loading").hide();
            data = json;
            console.log(data);
            printBooks();
             
        var qsRegex;

        var $grid = $('#library').isotope({
            itemSelector: '.flip-container',
            layoutMode: 'fitRows',
            filter: function () {
                return qsRegex ? $(this).text().match(qsRegex) : true;
            }
        });

        var $quicksearch = $('.quicksearch').keyup(debounce(function () {
            qsRegex = new RegExp($quicksearch.val(), 'gi');
            $grid.isotope();
        }, 200));

        function debounce(fn, threshold) {
            var timeout;
            return function debounced() {
                if (timeout) {
                    clearTimeout(timeout);
                }

                function delayed() {
                    fn();
                    timeout = null;
                }
                timeout = setTimeout(delayed, threshold || 100);
            }
        }
            

        },
        error: function () {
            alert("Something wrong happened. We can not get the info required.");
        }

    });

});

function printBooks() {

    console.log(data.books.length);


    for (var i = 0; i < data.books.length; i++) {


        var cover = data.books[i].portada;
        var validCover = String(cover);
        var title = data.books[i].titulo;
        var description = data.books[i].descripcion;
        var detail = data.books[i].detalle;
        var validDetail = String(detail);

        
        var flipContainer = document.createElement("div");
        flipContainer.setAttribute("class", "flip-container");
        flipContainer.setAttribute("ontouchstart", "this.classList.toggle('hover')");

        var flipper = document.createElement("div");
        flipper.setAttribute("class", "flipper");

        var front = document.createElement("div");
        front.setAttribute("class", "front");

        var frontCover = document.createElement("img");
        frontCover.setAttribute("class", "frontCover");
        frontCover.setAttribute("src", validCover);

        var back = document.createElement("div");
        back.setAttribute("class", "back");

        var backTitle = document.createElement("div");
        backTitle.setAttribute("class", "backTitle");

        var backDescrip = document.createElement("div");
        backDescrip.setAttribute("class", "backDescrip");

        var moreInfoDetail = document.createElement("a");
        moreInfoDetail.setAttribute("id", "moreInfo");
        moreInfoDetail.setAttribute("data-fancybox", "images");
        moreInfoDetail.setAttribute("class", "btn btn-info");
        moreInfoDetail.append("More Info");
        moreInfoDetail.setAttribute("data-src", validDetail);


        document.getElementById("library").append(flipContainer);
        flipContainer.appendChild(flipper);
        flipper.appendChild(front);
        front.appendChild(frontCover);

        flipper.appendChild(back);
        back.appendChild(backTitle);
        backTitle.innerHTML = title;

        back.appendChild(backDescrip);
        backDescrip.innerHTML = description;

        back.appendChild(moreInfoDetail);

    };

}
