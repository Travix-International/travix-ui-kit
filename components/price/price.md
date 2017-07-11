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

Price with discount:

    <div>
      <Price discount={50200.30} size="s" underlined value={50153.30} /><br/><br/>
      <Price additionalText="total" discount={50200.30} size="m" underlined value={50153.30} /><br/><br/>
    </div>

Sizes:

    <div>
      <Price size="s" value={50153.30} /><br/><br/>
      <Price size="m" underlined value={50153.30} /><br/><br/>
      <Price size="l" underlined value={50153.30} /><br/><br/>
      <Price size="xl" underlined value={50153.30} /><br/><br/>
    </div>
