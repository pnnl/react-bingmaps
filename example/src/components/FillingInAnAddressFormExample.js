// https://docs.microsoft.com/en-us/bingmaps/v8-web-control/map-control-concepts/autosuggest-module-examples/filling-in-an-address-form-example

import React from 'react'
import PropTypes from 'prop-types'

import Microsoft from '@pnnl/react-bingmaps'

import './FillingInAnAddressFormExample.css'

const AddressForm = ({
  address,
}) => {
  return (
    <table className="addressForm">
      <tbody>
        <tr>
          <td>Street Address:</td>
          <td>
            <input type="text" readOnly defaultValue={address ? address.addressLine : ''} />
          </td>
        </tr>
        <tr>
          <td>City:</td>
          <td>
            <input type="text" readOnly defaultValue={address ? address.locality : ''} />
          </td>
        </tr>
        <tr>
          <td>County:</td>
          <td>
            <input type="text" readOnly defaultValue={address ? address.district : ''} />
          </td>
        </tr>
        <tr>
          <td>State:</td>
          <td>
            <input type="text" readOnly defaultValue={address ? address.adminDistrict : ''} />
          </td>
        </tr>
        <tr>
          <td>Zip Code:</td>
          <td>
            <input type="text" readOnly defaultValue={address ? address.postalCode : ''} />
          </td>
        </tr>
        <tr>
          <td>Country:</td>
          <td>
            <input type="text" readOnly defaultValue={address ? address.countryRegion : ''} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

AddressForm.propTypes = {
  address: PropTypes.shape({
    addressLine: PropTypes.string,
    adminDistrict: PropTypes.string,
    countryRegion: PropTypes.string,
    countryRegionISO2: PropTypes.string,
    district: PropTypes.string,
    formattedAddress: PropTypes.string,
    locality: PropTypes.string,
    postalCode: PropTypes.string,
  }),
}

AddressForm.defaultProps = {
  address: undefined,
}

const UserInput = React.forwardRef(({
  ...props
}, ref) => {
  return (
    <input ref={ref} type="search" autoCapitalize="none" autoComplete="none" {...props} />
  );
})

const UserInputWithAutosuggest = Microsoft.Maps.AutoSuggest.attachAutosuggest(UserInput)

const FillingInAnAddressFormExample = ({
  query,
}) => {
  const [value, setValue] = React.useState(query);

  const [selectedSuggestion, setSelectedSuggestion] = React.useState(null);

  return (
    <>
      <Microsoft.Maps.AutoSuggest.AutosuggestManager placeSuggestions={false}>
        <UserInputWithAutosuggest onChange={setValue} onSuggestionItemSelected={setSelectedSuggestion} value={value} style={{ width: 400, }} />
      </Microsoft.Maps.AutoSuggest.AutosuggestManager>
      <AddressForm address={selectedSuggestion ? selectedSuggestion.address : null} />
    </>
  );
}

FillingInAnAddressFormExample.propTypes = {
  query: PropTypes.string.isRequired,
}

FillingInAnAddressFormExample.defaultProps = {
  query: '',
}

export default React.memo(FillingInAnAddressFormExample)
