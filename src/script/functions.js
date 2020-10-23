// Válida o Formulário
$(document).ready(function pageLoaded() {
  // Cidade
  $('#submit').click(function citySubmit() {
    if ($('#city').val() === '' && $('#by-location').hasClass('show')) {
      $('#city-div').addClass('is-invalid');
      $('#city').addClass('is-invalid');
      $('#ico').addClass('is-invalid');
    }
  });
  $('#city').on('input', function cityChange() {
    if ($('#city').val() !== '') {
      $('#city-div').removeClass('is-invalid').addClass('is-valid');
      $('#city').removeClass('is-invalid').addClass('is-valid');
      $('#ico').removeClass('is-invalid').addClass('is-valid');
    } else {
      $('#city-div').removeClass('is-valid').addClass('');
      $('#city').removeClass('is-valid').addClass('');
      $('#ico').removeClass('is-valid').addClass('');
    }
  });

  // Estado
  $('#state').on('input', function stateChange() {
    if ($('#state').val() === '') {
      $('#state-div').removeClass('is-valid').addClass('');
      $('#state').removeClass('is-valid').addClass('');
      $('#ico-s').removeClass('is-valid').addClass('');
    } else {
      $('#state-div').addClass('is-valid');
      $('#state').addClass('is-valid');
      $('#ico-s').addClass('is-valid');
    }
  });

  // País
  $('#country').on('input', function countryChange() {
    if ($('#country').val() === '') {
      $('#country-div').removeClass('is-valid').addClass('');
      $('#country').removeClass('is-valid').addClass('');
      $('#ico-c').removeClass('is-valid').addClass('');
    } else {
      $('#country-div').addClass('is-valid');
      $('#country').addClass('is-valid');
      $('#ico-c').addClass('is-valid');
    }
  });

  // Latitude
  $('#submit').click(function latSubmit() {
    if ($('#lat').val() === '' && $('#by-coordinates').hasClass('show')) {
      $('#lat-div').addClass('is-invalid');
      $('#lat').addClass('is-invalid');
      $('#ico-la').addClass('is-invalid');
    }
  });
  $('#lat').on('input', function latChange() {
    if ($('#lat').val() !== '') {
      $('#lat-div').removeClass('is-invalid').addClass('is-valid');
      $('#lat').removeClass('is-invalid').addClass('is-valid');
      $('#ico-la').removeClass('is-invalid').addClass('is-valid');
    } else {
      $('#lat-div').removeClass('is-valid').addClass('');
      $('#lat').removeClass('is-valid').addClass('');
      $('#ico-la').removeClass('is-valid').addClass('');
    }
  });

  // Longitude
  $('#submit').click(function lonSubmit() {
    if ($('#lon').val() === '' && $('#by-coordinates').hasClass('show')) {
      $('#lon-div').addClass('is-invalid');
      $('#lon').addClass('is-invalid');
      $('#ico-lo').addClass('is-invalid');
    }
  });
  $('#lon').on('input', function lonChange() {
    if ($('#lon').val() !== '') {
      $('#lon-div').removeClass('is-invalid').addClass('is-valid');
      $('#lon').removeClass('is-invalid').addClass('is-valid');
      $('#ico-lo').removeClass('is-invalid').addClass('is-valid');
    } else {
      $('#lon-div').removeClass('is-valid').addClass('');
      $('#lon').removeClass('is-valid').addClass('');
      $('#ico-lo').removeClass('is-valid').addClass('');
    }
  });

  // Insere as Coordenadas atuais
  $('#set-coord').click(function setCoord() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function setPosition(position) {
          $('#lat').val(position.coords.latitude);
          $('#lon').val(position.coords.longitude);
          if ($('#lat').hasClass('is-invalid')) {
            $('#lat-div').removeClass('is-invalid').addClass('is-valid');
            $('#lat').removeClass('is-invalid').addClass('is-valid');
            $('#ico-la').removeClass('is-invalid').addClass('is-valid');
            $('#lat')[0].setCustomValidity('');
          } else {
            $('#lat-div').addClass('is-valid');
            $('#lat').addClass('is-valid');
            $('#ico-la').addClass('is-valid');
          }
          if ($('#lon').hasClass('is-invalid')) {
            $('#lon-div').removeClass('is-invalid').addClass('is-valid');
            $('#lon').removeClass('is-invalid').addClass('is-valid');
            $('#ico-lo').removeClass('is-invalid').addClass('is-valid');
            $('#lon')[0].setCustomValidity('');
          } else {
            $('#lon-div').addClass('is-valid');
            $('#lon').addClass('is-valid');
            $('#ico-lo').addClass('is-valid');
          }
        },
        function checkError(error) {
          if (error.code === error.PERMISSION_DENIED)
            alert(
              'Acesso ao serviço de Geolocalização negado. \nConceda permissão para usar esta funcionalidade.'
            );
        }
      );
    } else {
      alert('Seu navegador não oferece suporte a Geolocalização.');
    }
  });

  // Modo de Pesquisa
  $('input[type=radio][name=mode]').change(function searchMode() {
    const mode = $('input[type=radio][name=mode]:checked').val();
    if (mode === 'location') {
      $('#by-location').removeClass('hide').addClass('show');
      $('#by-coordinates').removeClass('show').addClass('hide');
      $('#set-coord').removeClass('show').addClass('hide');
      $('#city').prop('disabled', false);
      $('#state').prop('disabled', false);
      $('#country').prop('disabled', false);
      $('#lat').prop('disabled', true);
      $('#lon').prop('disabled', true);
    } else if (mode === 'coordinates') {
      $('#by-location').removeClass('show').addClass('hide');
      $('#by-coordinates').removeClass('hide').addClass('show');
      $('#set-coord').removeClass('hide').addClass('show');
      $('#city').prop('disabled', true);
      $('#state').prop('disabled', true);
      $('#country').prop('disabled', true);
      $('#lon').prop('disabled', false);
      $('#lat').prop('disabled', false);
    }
  });

  // Focus do Button Radio
  $('input[type="radio"').focusin(function radioFocusIn() {
    $(this).addClass('is-valid');
  });
  $('input[type="radio"').focusout(function radioFocusOut() {
    $(this).removeClass('is-valid').addClass('');
  });
});
