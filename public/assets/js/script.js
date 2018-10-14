$(document).ready(function() {
    $(".devourBtn").on("click", function(e) {
        let id = $(this).data("id");

        $.ajax("/api/devour/" + id, {
            type: "PUT",
            data: { devoured: true }
        }).then(function() {
            location.reload();
        });
    });

    $(".create-form").on("submit", function(e) {
        e.preventDefault();

        let newBurger = {
            burger_name: $("#inputBurgerName").val().trim(),
            devoured: false
        };

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function() {
            location.reload();
        });
    });
});