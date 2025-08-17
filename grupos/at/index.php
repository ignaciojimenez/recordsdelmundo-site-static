<!doctype html>
<html lang="es">
<head>
<?php
require("../../head.php");
?>
	<link href="../../style/back.css" type="text/css" rel="stylesheet" />
</head>
<body onload="$('.contenido').fadeIn(900);">
	<div class="container">
		<div class="lateral_izq">
			LATERAL IZQ
		</div>
		<div class="lateral_izq_inferior">
		</div>

		<div class="lateral_dch">
			<?php
			require("../../dcha.php");
			?>
		</div>

		<div class="centro">

			<?php
			require("../../menu.php");
			?>

			<div class="contenido" id="contenido">
				<img class="imagen" src="../../images/at_selr_1200.jpg" />
				<span class="piedefoto">Foto: <a href="http://nsefotografia.com/">Mariano Regidor</a></span>
				<br>
				<table class="tablagrupo">
					<tr>
						<td class="datos"><a href="AT_VLTRA_Prensa.pdf"><span>Nota de prensa</span></a> · <a href="rider_at.pdf"><span>Rider</span></a></td>
						<td class="social">
						<a class="iconos facebook" href="http://www.facebook.com/atencion.tsunami"></a>
						<a class="iconos instagram" href="http://instagram.com/atenciontsunami"></a>
						<a class="iconos bandcamp" href="http://atenciontsunami.bandcamp.com"></a>
						</td>
					</tr>
				</table>


				<p>
					Tres años después de <i>Silencio en la retaguardia (RDM 2016)</i> —mejor disco español del año para El
					Cultural de El Mundo y mejor disco del año en Madrid para la revista Mondosonoro— <strong>Atención Tsunami</strong>
					regresan al ruido ibérico con <i>VLTRA</i>.
				</p>
				<p>
					Tras una larga gestación, la criatura ha salido fiera y hermosa: ocho cortes crudos y directos, rebosantes
					de gasolina, lírica y mucho whammy (¿quién quiere autotune teniendo <i>whammy</i>?). Esta vez, el ritmo y la
					palabra ganan la partida a la melodía, y la urgencia a la introspección. <i>Vltra</i> («más allá») es un disco ambivalente,
					un viaje que aborda la sensación planetaria de ir de cabeza hacia al abismo, pero que se aferra en el último momento a la esperanza
					de que los círculos viciosos (los propios mentales y los de regresión política y social) pueden y deben
					romperse. Claro que sí.
				</p>
				<p>
					<strong>Disoriented Adult Rock para tiempos oscuros.</strong>
				</p>
				<br>
				<!--
				<script>
				setTimeout(function(){ $("#contenido").append('<iframe src="https://www.youtube.com/embed/85ythvl7wU4?rel=0"  min-width="660px" width="100%" height="405px" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe><br><br>'); }, 200);
				</script>
			-->
			</div>
		</div>
	</div>
</body>
</html>
