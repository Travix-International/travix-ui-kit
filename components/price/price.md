Basic Price:

    <div>
      <Price decimalsSeparator="," thousandsSeparator="." underlined value={50153.30} /><br/><br/>
      <Price decimalsSeparator="." symbol="د.إ.‏" symbolPosition="right" thousandsSeparator=" " underlined value={50153.30} /><br/><br/>
      <Price decimalsSeparator="," showDecimals={false} thousandsSeparator="." underlined value={50153.30} /><br/><br/>
    </div>

Price with additional text:

    <div>
      <Price additionalText="per day" decimalsSeparator="," thousandsSeparator="." underlined value={43.9} /><br/><br/>
    </div>

Price with discount:

    <div>
      <Price additionalText="per day" decimalsSeparator="," discount={50.2} thousandsSeparator="." underlined value={43.9} /><br/><br/>
    </div>

Sizes:

    <div>
      <Price size="s" value={50153.30} /><br/><br/>
      <Price size="m" underlined value={50153.30} /><br/><br/>
      <Price size="l" underlined value={50153.30} /><br/><br/>
      <Price size="xl" underlined value={50153.30} /><br/><br/>
    </div>
