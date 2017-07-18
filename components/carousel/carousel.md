Carousel:

    <div>
      <Carousel
        images={[
          'http://lorempixel.com/600/400/city',
          'http://lorempixel.com/600/400/sports',
          'http://lorempixel.com/600/400/people',
          'http://lorempixel.com/600/400/nature',
          'http://lorempixel.com/600/400/food',
          'http://lorempixel.com/600/400/abstract',
          'http://lorempixel.com/600/400/fashion',
        ]}
      />
    </div>
Carousel with markers and custom initial:

    <div>
      <Carousel
        images={[
          'http://lorempixel.com/600/400/city',
          'http://lorempixel.com/600/400/sports',
          'http://lorempixel.com/600/400/people',
          'http://lorempixel.com/600/400/nature',
          'http://lorempixel.com/600/400/abstract',
          'http://lorempixel.com/600/400/food',
          'http://lorempixel.com/600/400/fashion',
        ]}
        current={3}
        markers
      />
    </div>

Carousel with single image:
    
    <div>
      <Carousel
        images={[
          'http://lorempixel.com/600/400/city',
        ]}
        markers
      />
    </div>