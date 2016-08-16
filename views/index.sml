extends(src='layout.sml')
  block(name='content')
    main
      section
        #hero(style=bg)
          a(href={{locals.data.headlines[0].perma}} )
            h1  {{locals.data.headlines[0].title}}
            img(src={{locals.data.headlines[0].image}})
            .hero-overlay

        .recent-stories
          each(loop="post, i in locals.data.headlines")
            if(condition="i > 0")
              .story
                a(href={{post.perma}})
                  img(src={{post.image}})
                  h2 {{post.title}}

      aside.sidebar
        h1 side pieces
        div
          p 1
        div
          p 2
        div
          p 3
        div
          p 4
