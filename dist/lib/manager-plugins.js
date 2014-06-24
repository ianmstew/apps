$(function  () {
  $("ol.app-list").sortable({
    group: 'app-list',
    pullPlaceholder: false,
    // animation on drop
    onDrop: function  (item, targetContainer, _super) {
      var clonedItem = $('<li/>').css({height: 0})
      item.before(clonedItem)
      clonedItem.animate({'height': item.height()})

      item.animate(clonedItem.position(), function  () {
        clonedItem.detach()
        _super(item)
      })
    },

    // set item relative to cursor position
    onDragStart: function ($item, container, _super) {
      var offset = $item.offset(),
      pointer = container.rootGroup.pointer

      adjustment = {
        left: pointer.left - offset.left,
        top: pointer.top - offset.top
      }

      _super($item, container)
    },
    onDrag: function ($item, position) {
      $item.css({
        left: position.left - adjustment.left,
        top: position.top - adjustment.top
      })
    }
  })
})

// IE Polyfill for Modal Transitions
$('#demo').collapse({
  toggle: true
});

// Datepicker
jQuery(function($){
    $('.pick-date').datepicker({
      changeDate: true
    })
});

// Make Recurring
$('.make-recurring').on("click", function() {
    if ($(this).prop("checked")) {
        $('.recurring-settings').fadeIn(100);
    }
    else {
        $('.recurring-settings').fadeOut(100);
    }
});

// Settings Detail
