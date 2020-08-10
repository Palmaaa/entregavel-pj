const tbody = document.getElementsByTagName('tbody')[0];
const overlay = document.getElementById('overlay');
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.polijunior.com.br/notas');
xhr.responseType = 'json';
xhr.onload = () => {
    var data = xhr.response;
    for (var i = 0; i < data.length; i++) {
        var row = document.createElement('tr');
        const nota_necessaria = (parseFloat(data[i].media_pretendida)*(parseFloat(data[i].peso_p1) + parseFloat(data[i].peso_p2) + parseFloat(data[i].peso_p3)) - parseFloat(data[i].peso_p1)*parseFloat(data[i].nota_p1) - parseFloat(data[i].peso_p2)*parseFloat(data[i].nota_p2))/parseFloat(data[i].peso_p3);
        tbody.appendChild(row);
        var materia = document.createElement('td');
        var p1 = document.createElement('td');
        var p2 = document.createElement('td');
        var media = document.createElement('td');
        var p3 = document.createElement('td');
        materia.innerHTML = data[i].materia;
        p1.innerHTML = data[i].nota_p1.toFixed(1).toString().replace(".", ",") + " (" + data[i].peso_p1 + ")";
        p2.innerHTML = data[i].nota_p2.toFixed(1).toString().replace(".", ",") + " (" + data[i].peso_p2 + ")";
        p3.innerHTML = (nota_necessaria <= 0 ? "0,0" : nota_necessaria.toFixed(1).toString().replace(".", ",")) + " (" + data[i].peso_p3 + ")";
        media.innerHTML = data[i].media_pretendida.toFixed(1).toString().replace(".", ",");;
        row.appendChild(materia);
        row.appendChild(p1);
        row.appendChild(p2);
        row.appendChild(media);
        row.appendChild(p3);
        if (nota_necessaria < 0) 
            p3.classList.add("bg-success");
        if (nota_necessaria > 10)
            p3.classList.add("bg-danger");
    }
    overlay.setAttribute("style", "display: none;");
};
xhr.send();
