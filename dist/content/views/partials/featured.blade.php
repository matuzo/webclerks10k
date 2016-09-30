<div class="ft__card ft__card--{{ $_SESSION['events_display'] }} {{ $classes }}" @if($id) id="{{ $id }}" @endif>
    @yield('featuredImage')
  <div class="ft__ct ft__ct--{{ $_SESSION['events_display'] }}">
    @yield('featuredContent')
  </div> 
</div> 