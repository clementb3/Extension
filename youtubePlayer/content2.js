let selectHost = document.getElementsByClassName("host-select")[0]
selectHost.addEventListener("change", () => {
    console.log(selectHost.value)
    localStorage.setItem("Player", selectHost.value );

})
selectHost.value = localStorage.getItem("Player");