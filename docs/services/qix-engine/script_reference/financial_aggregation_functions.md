# Financial aggregation functions

## IRR

 **IRR()**
returns the aggregated internal rate of return for a series of cash
flows represented by the numbers in the expression iterated over a
number of records as defined by a group by clause.

These cash flows do not have to be even, as they would be for an
annuity. However, the cash flows must occur at regular intervals, such
as monthly or annually. The internal rate of return is the interest rate
received for an investment consisting of payments (negative values) and
income (positive values) that occur at regular periods.The function
needs at least one positive and one negative value to
calculate.

`IRR( value )`

**Return data type:** numeric

| Argument | Description                                                 |
| -------- | ----------------------------------------------------------- |
| value    | The expression or field containing the data to be measured. |

Text values, NULL values and missing values are disregarded.

Add the example script to your app and run it. Then add, at least, the
fields listed in the results column to a sheet in your app to see the
result.

### Example

Script:

```code
Cashflow:
LOAD 2013 as Year, * inline [
Date|Discount|Payments
2013-01-01|0.1|-10000
2013-03-01|0.1|3000
2013-10-30|0.1|4200
2014-02-01|0.2|6800
] (delimiter is '|');

Cashflow1:
LOAD Year,IRR(Payments) as IRR2013 Resident Cashflow Group By Year;
```

Result:

| Year | IRR2013 |
| ---- | ------- |
| 2013 | 0.1634 |

## NPV

NPV() returns the aggregated net present value of an investment based on a
 **discount_rate** per period and a series of future payments (negative values) and incomes
(positive values), represented by the numbers in **value** ,
iterated over a number of records, as defined by a group by clause. The
payments and incomes are assumed to occur at the end of each period.

`NPV( discount_rate, value )`

**Return data type:** numeric. The result has a default number format of money.

| Argument       | Description                                                                |
| -------------- | -------------------------------------------------------------------------- |
| discount_rate  |  **discount_rate**  is the rate of discount over the length of the period. |
| value          | The expression or field containing the data to be measured.                |

Text values, NULL values and missing values are disregarded.

Add the example script to your app and run it. Then add, at least, the
fields listed in the results column to a sheet in your app to see the
result.

### Example

Script:

```code
Cashflow:
LOAD 2013 as Year, * inline [
Date|Discount|Payments
2013-01-01|0.1|-10000
2013-03-01|0.1|3000
2013-10-30|0.1|4200
2014-02-01|0.2|6800
] (delimiter is '|');

Cashflow1:
LOAD Year,NPV(0.2, Payments) as NPV1_2013 Resident Cashflow Group By Year;
```

Result:

| Year | NPV1_2013 |
| ---- | --------- |
| 2013 | -$540.12 |

Given that the Cashflow table is loaded as in the previous example:

```code
LOAD Year,NPV(Discount, Payments) as NPV2_2013 Resident Cashflow Group
By Year, Discount;
```

Note that the Group By clause sorts the results by Year and Discount.
The first argument, discount_rate, is given as a field (Discount),
rather than a specific number, and therefore, a second sorting criterion
is required. A field can contain a different values, so the aggregated
records must be sorted to allow for different values of Year and
Discount.

| Year | Discount | NPV2_2013 |
| ---- | -------- | --------- |
| 2013 | 0.1 | -$3456.05 |
| 2013 | 0.2 | $5666.67 |

## XIRR

 **XIRR()** returns the aggregated internal rate of return for a schedule of cash
flows (that is not necessarily periodic) represented by paired numbers
in **pmt** and **date** iterated over a number of records as defined by a group by clause. All
payments are discounted based on a 365-day year.

`XIRR( pmt, date )`

**Return data type:** numeric

| Argument | Description                                                                                                     |
| -------- | --------------------------------------------------------------------------------------------------------------- |
| pmt      | Payments.The expression or field containing the cash flows corresponding to the payment schedule given in date. |
| date     | The expression or field containing the schedule of dates corresponding to the cash flow payments given in pmt.  |

Text values, NULL values and missing values in any or both pieces of a
data-pair will result in the entire data-pair to be disregarded.

Add the example script to your app and run it. Then add, at least, the
fields listed in the results column to a sheet in your app to see the
result.

### Example

Script:

```code
Cashflow:
LOAD 2013 as Year, * inline [
Date|Discount|Payments
2013-01-01|0.1|-10000
2013-03-01|0.1|3000
2013-10-30|0.1|4200
2014-02-01|0.2|6800
] (delimiter is '|');

Cashflow1:
LOAD Year,XIRR(Payments, Date) as XIRR2013 Resident Cashflow Group By Year;
```

Result:

| Year | XIRR2013 |
| ---- | -------- |
| 2013 | 0.5385 |

## XNPV

 **XNPV()** returns the aggregated net present value for a schedule of cashflows
(not necessarily periodic) represented by paired numbers in **pmt** and
 **date**, iterated over a number of records as defined by a group by clause. Rate
is the interest rate per period. All payments are discounted based on a
365-day year.

`XNPV( discount_rate, pmt, date )``

**Return data type:** numeric. The result has a default number format of money.

| Argument       | Description                                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------------------- |
| discount_rate  |  **discount_rate**  is the rate of discount over the length of the period.                                          |
| pmt            | The expression or field containing the data to be measured.                                                         |
| date           | The expression or field containing the schedule of dates corresponding to the cash flow payments given in  **pmt**. |

Text values, NULL values and missing values in any or both pieces of a
data-pair will result in the entire data-pair to be disregarded.

Add the example script to your app and run it. Then add, at least, the
fields listed in the results column to a sheet in your app to see the
result.

### Example

Script:

```code
Cashflow:
LOAD 2013 as Year, * inline [
Date|Discount|Payments
2013-01-01|0.1|-10000
2013-03-01|0.1|3000
2013-10-30|0.1|4200
2014-02-01|0.2|6800
] (delimiter is '|');

Cashflow1:
LOAD Year,XNPV(0.2, Payments, Date) as XNPV1_2013 Resident Cashflow Group By Year;
```

Result:

| Year | XNPV1_2013 |
| ---- | ---------- |
| 2013 | $2104.37 |

Given that the Cashflow table is loaded as in the previous example:

```code
LOAD Year,XNPV(Discount, Payments, Date) as XNPV2_2013 Resident
Cashflow Group By Year, Discount;
```

Note that the Group By clause sorts the results by Year and Discount.
The first argument, discount_rate, is given as a field (Discount),
rather than a specific number, and therefore, a second sorting criterion
is required. A field can contain a different values, so the aggregated
records must be sorted to allow for different values of Year and
Discount.

| Year | Discount | XNPV2_2013 |
| ---- | -------- | ---------- |
| 2013 | 0.1 | -$3164.35 |
| 2013 | 0.2 | $6800.00 |
