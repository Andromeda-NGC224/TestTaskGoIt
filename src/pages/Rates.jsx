import { Wave } from 'react-animated-text';

import { Container, Filter, Heading, Loader, RatesList, Section } from 'components';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectError,
  selectLoading,
  selectBaseCurrency,
  selectFilteredRates,
  selectRates,
} from '../redux/selectors';
import { useEffect } from 'react';
import { fetchLatestSymbols } from '../redux/currency/operations';

const Rates = () => {
  const isError = useSelector(selectError);
  const isLoading = useSelector(selectLoading);
  const ratesInfo = useSelector(selectFilteredRates);
  const baseCurrency = useSelector(selectBaseCurrency);
  const rates = useSelector(selectRates)

  console.log(ratesInfo);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchLatestSymbols(baseCurrency));
  }, [baseCurrency, dispatch]);

  return (
    <Section>
      <Container>
        <Heading
          info
          bottom
          title={
            <Wave
              text={`$ $ $ Current exchange rate for 1 ${baseCurrency} $ $ $`}
              effect="fadeOut"
              effectChange={4.0}
            />
          }
        />
        {rates.length > 0 && <Filter/>}
        {ratesInfo.length > 0 && <RatesList rates={ratesInfo} />}
        {isLoading && <Loader />}
        {isError && (
          <Heading
            error
            title="Something went wrong...😐 We cannot show current rates!"
          />
        )}
      </Container>
    </Section>
  );
};

export default Rates;
