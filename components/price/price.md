Basic Price:

    <div>
      <Price decimalsSeparator="," thousandsSeparator="." underlined value={50153.30} /><br/><br/>
      <Price decimalsSeparator="." symbol="د.إ.‏" symbolPosition="right" thousandsSeparator=" " underlined value={50153.30} /><br/><br/>
      <Price decimalsSeparator="," showDecimals={false} thousandsSeparator="." underlined value={50153.30} /><br/><br/>
    </div>

Price with additional text:

    <div>
      <Price additionalText="per day" underlined value={50153.30} />
    </div>

Price with asterisk:

    <div>
      <Price discount={50200.30} showAsterisk size="s" underlined value={50153.30} /><br/><br/>
      <Price additionalText="total" discount={50200.30} showAsterisk size="m" symbolPosition="right" underlined value={50153.30} /><br/><br/>
      <Price additionalText="total" discount={50200.30} showAsterisk size="xl" value={50153.30} /><br/><br/>
    </div>

Price with discount:

    <div>
      <Price discount={50200.30} size="s" underlined value={50153.30} /><br/><br/>
      <Price additionalText="total" discount={50200.30} size="m" underlined value={50153.30} /><br/><br/>
    </div>

Unstyled price:

    <div>
      <Price value={12345.67} unstyled />
    </div>

Sizes:

    <div>
      <Price showAsterisk size="xs" underlined value={50153.30} /><br/><br/>
      <Price size="s" underlined value={50153.30} /><br/><br/>
      <Price size="m" underlined value={50153.30} /><br/><br/>
      <Price showAsterisk size="l" underlined value={50153.30} /><br/><br/>
      <Price size="xl" underlined value={50153.30} /><br/><br/>
    </div>
