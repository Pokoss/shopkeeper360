<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">


        
         <!-- Primary Meta Tags -->
    <title inertia>@isset($title){{$title}}@else Biashari @endisset</title>
    <meta name="title" content="@isset($title){{$title}}@else Biashari System @endisset">
    <meta name="description" content="@isset($description){{$description}}@else A system desgined for both retail and service business that helps to run and monitor the business and it's performance @endisset">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{url()->current()}}">
    <meta property="og:title" content="@isset($title){{$title}}@else Biashari System @endisset">
    <meta property="og:description" content="@isset($description){{$description}}@else A system desgined for both retail and service business that helps to run and monitor the business and it's performance @endisset">
    <meta property="og:image" content="@isset($image){{$image}}@else {{url('/images/user/shopkeeper360.png')}} @endisset">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="{{url()->current()}}">
    <meta property="twitter:title" content="@isset($title){{$title}}@else Biashari System @endisset">
    <meta property="twitter:description" content="@isset($description){{$description}}@else A system desgined for both retail and service business that helps to run and monitor the business and it's performance @endisset">
    <meta property="twitter:image" content="@isset($image){{$image}}@else {{url('/images/user/shopkeeper360.png')}} @endisset">
    
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="theme-color" content="#ffffff">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;600;700&amp;display=swap" rel="stylesheet">




        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
