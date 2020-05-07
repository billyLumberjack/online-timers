jQuery(function($) {
	
	$(document).ready(function()
	{
		bip_actif();
	});

	$('.nbr-clk li a').click(function(_e)
	{
		_e.preventDefault();

		var __decompose = $(this).attr('id').split('-');

		bip_actif(__decompose[1]);
	});

	function bip_actif(_num)
	{
		$('.nbr-clk li a').each(function()
		{
			var __decompose = $(this).attr('id').split('-');

			if ( _num == undefined)
			{
				if ( localStorage['t1_nbr_bip'] != null )
				{
					_num = localStorage['t1_nbr_bip'];
				}
				else
				{
					_num = 999;					
				}
			}
			
			if (__decompose[1] == _num)
			{
				$(this).addClass('active');
				
				localStorage['t1_nbr_bip'] = _num;
			}
			else
			{
				$(this).removeClass('active');
			}
		});
	}
		
	$('.ajax').click(function(_e) 
	{
		_e.preventDefault();
		var __url = $(this).attr('href');
		var __depart_time = new Date().getTime();
		$(location).attr('href',__url + '?time=' + (__depart_time - 1351771000000));
	});
	
	$('#f-valide').click(function(_e) 
	{		
		_e.preventDefault();
		
		var __minute = parseInt($('#f-minute').val());
		var __tx_minuteur = $('#f-valide').attr('name');
		var __tx_minute = $('#f-minute').attr('name');
		
		if (__minute > 1)
		{
			__tx_minute += 's';
		}
		
		var __url = 'http://' + window.location.host + '/' + __tx_minuteur + '-' + __minute + '-' + __tx_minute;
		
		var __seconde = parseInt($('#f-seconde').val());
		
		if (__seconde)
		{
			var __tx_seconde = $('#f-seconde').attr('name');
			
			__url += '-' + __seconde + '-' + __tx_seconde;			
		}		
		
		var __depart_time = new Date().getTime();
		
		$(location).attr('href',__url + '?time=' + (__depart_time - 1351771000000));
	});
}); 