$(document).ready(function () {
    $('canvas').each(function () {
        let $this = $(this);
        
        $this.parent().css('padding', 0);
        
        let context = this.getContext('2d');
        let object = $this.data('chartJsObject');
        
        new Chart(context, object);
    });
});
