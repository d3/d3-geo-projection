# d3-geo-projection

Extended geographic projections for D3.

## Installing

If you use NPM, `npm install d3-geo-projection`. Otherwise, download the [latest release](https://github.com/d3/d3-geo-projection/releases/latest). You can also load directly from [d3js.org](https://d3js.org) as a [standalone library](https://d3js.org/d3-geo-projection.v1.min.js). AMD, CommonJS, and vanilla environments are supported. In vanilla, a `d3` global is exported:

```html
<script src="https://d3js.org/d3-geo.v1.min.js"></script>
<script src="https://d3js.org/d3-geo-projection.v1.min.js"></script>
<script>

var aitoff = d3.geoAitoff();

</script>
```

[Try d3-geo-projection in your browser.](https://tonicdev.com/npm/d3-geo-projection)

## Examples

<a href="#geoAitoff" name="geoAitoff">#</a> d3.<b>geoAitoff</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/aitoff.png" width="480" height="250">](http://bl.ocks.org/mbostock/3682698)

The Aitoff projection.

<a href="#geoAiry" name="geoAiry">#</a> d3.<b>geoAiry</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/airy.png" width="480" height="250">](http://bl.ocks.org/mbostock/5620807)

Airy’s minimum-error azimuthal projection.

<a href="airy_radius" name="airy_raidus">#</a> <i>airy</i>.<b>radius</b>([<i>radius</i>])

Defaults to 90°.

<a href="#geoAlbers" name="geoAlbers">#</a> d3.<b>geoAlbers</b>()

[Albers equal-area conic](http://bl.ocks.org/mbostock/3734308)

<a href="#geoArmadillo" name="geoArmadillo">#</a> d3.<b>geoArmadillo</b>()

[Armadillo](http://bl.ocks.org/mbostock/4463127)

<a href="#geoAugust" name="geoAugust">#</a> d3.<b>geoAugust</b>()

[August conformal](http://bl.ocks.org/mbostock/3797581)

<a href="#geoAzimuthalEqualArea" name="geoAzimuthalEqualArea">#</a> d3.<b>geoAzimuthalEqualArea</b>()

[Lambert azimuthal equal-area](http://bl.ocks.org/mbostock/3757101)

<a href="#geoAzimuthalEquidistant" name="geoAzimuthalEquidistant">#</a> d3.<b>geoAzimuthalEquidistant</b>()

[azimuthal equidistant](http://bl.ocks.org/mbostock/3757110)

<a href="#geoBaker" name="geoBaker">#</a> d3.<b>geoBaker</b>()

[Baker Dinomic](http://bl.ocks.org/mbostock/4476279)

<a href="#geoBerghaus" name="geoBerghaus">#</a> d3.<b>geoBerghaus</b>()

[Berghaus Star](http://bl.ocks.org/mbostock/4463049)

<a href="#geoBoggs" name="geoBoggs">#</a> d3.<b>geoBoggs</b>()

[Boggs eumorphic](http://bl.ocks.org/mbostock/4481220)

<a href="#geoBonne" name="geoBonne">#</a> d3.<b>geoBonne</b>()

[Bonne](http://bl.ocks.org/mbostock/3734313)

<a href="#geoBromley" name="geoBromley">#</a> d3.<b>geoBromley</b>()

[Bromley](http://bl.ocks.org/mbostock/4487695)

<a href="#geoChamberlin" name="geoChamberlin">#</a> d3.<b>geoChamberlin</b>()

[Chamberlin trimetric](http://bl.ocks.org/mbostock/5625053)

<a href="#geoCollignon" name="geoCollignon">#</a> d3.<b>geoCollignon</b>()

[Collignon](http://bl.ocks.org/mbostock/3734316)

<a href="#geoConicConformal" name="geoConicConformal">#</a> d3.<b>geoConicConformal</b>()

[Lambert conformal conic](http://bl.ocks.org/mbostock/3734321)

<a href="#geoConicEquidistant" name="geoConicEquidistant">#</a> d3.<b>geoConicEquidistant</b>()

[conic equidistant](http://bl.ocks.org/mbostock/3734317)

<a href="#geoCraig" name="geoCraig">#</a> d3.<b>geoCraig</b>()

[Craig retroazimuthal](http://bl.ocks.org/mbostock/4459466)

<a href="#geoCraster" name="geoCraster">#</a> d3.<b>geoCraster</b>()

[Craster parabolic](http://bl.ocks.org/mbostock/4465118)

<a href="#geoCylindricalEqualArea" name="geoCylindricalEqualArea">#</a> d3.<b>geoCylindricalEqualArea</b>()

[cylindrical equal-area](http://bl.ocks.org/mbostock/3712408), [Gall–Peters](http://bl.ocks.org/mbostock/3946824), [Hobo–Dyer](http://bl.ocks.org/mbostock/4476487), [Tobler world-in-a-square](http://bl.ocks.org/mbostock/4476496)

<a href="#geoCylindricalStereographic" name="geoCylindricalStereographic">#</a> d3.<b>geoCylindricalStereographic</b>()

cylindrical stereographic, [Gall’s stereographic](http://bl.ocks.org/mbostock/5234763)

<a href="#geoEckert1" name="geoEckert1">#</a> d3.<b>geoEckert1</b>()

[Eckert I](http://bl.ocks.org/mbostock/3734322)

<a href="#geoEckert2" name="geoEckert2">#</a> d3.<b>geoEckert2</b>()

[Eckert II](http://bl.ocks.org/mbostock/3734324)

<a href="#geoEckert3" name="geoEckert3">#</a> d3.<b>geoEckert3</b>()

[Eckert III](http://bl.ocks.org/mbostock/3734325)

<a href="#geoEckert4" name="geoEckert4">#</a> d3.<b>geoEckert4</b>()

[Eckert IV](http://bl.ocks.org/mbostock/3734327)

<a href="#geoEckert5" name="geoEckert5">#</a> d3.<b>geoEckert5</b>()

[Eckert V](http://bl.ocks.org/mbostock/3734328)

<a href="#geoEckert6" name="geoEckert6">#</a> d3.<b>geoEckert6</b>()

[Eckert VI](http://bl.ocks.org/mbostock/3734329)

<a href="#geoEisenlohr" name="geoEisenlohr">#</a> d3.<b>geoEisenlohr</b>()

[Eisenlohr conformal](http://bl.ocks.org/mbostock/3797585)

<a href="#geoEquirectangular" name="geoEquirectangular">#</a> d3.<b>geoEquirectangular</b>()

[Equirectangular (Plate Carrée)](http://bl.ocks.org/mbostock/3757119), [Cassini](http://bl.ocks.org/mbostock/5695142)

<a href="#geoFahey" name="geoFahey">#</a> d3.<b>geoFahey</b>()

[Fahey](http://bl.ocks.org/mbostock/4731228)

<a href="#geoFoucaut" name="geoFoucaut">#</a> d3.<b>geoFoucaut</b>()

Foucaut

<a href="#geoGilbert" name="geoGilbert">#</a> d3.<b>geoGilbert</b>(<i>projection</i>)

[Gilbert’s two-world perspective](http://www.jasondavies.com/maps/gilbert/) Wraps the specified *projection*, such as d3.geoOrthographic.

<a href="#geoGingery" name="geoGingery">#</a> d3.<b>geoGingery</b>()

[Gingery](http://www.jasondavies.com/maps/gingery/)

<a href="#geoGinzburg4" name="geoGinzburg4">#</a> d3.<b>geoGinzburg4</b>()

[Ginzburg IV](http://bl.ocks.org/mbostock/5288565)

<a href="#geoGinzburg5" name="geoGinzburg5">#</a> d3.<b>geoGinzburg5</b>()

[Ginzburg V](http://bl.ocks.org/mbostock/5288571)

<a href="#geoGinzburg6" name="geoGinzburg6">#</a> d3.<b>geoGinzburg6</b>()

[Ginzburg VI](http://bl.ocks.org/mbostock/5288577)

<a href="#geoGinzburg8" name="geoGinzburg8">#</a> d3.<b>geoGinzburg8</b>()

[Ginzburg VIII](http://bl.ocks.org/mbostock/5288583)

<a href="#geoGinzburg9" name="geoGinzburg9">#</a> d3.<b>geoGinzburg9</b>()

[Ginzburg IX](http://bl.ocks.org/mbostock/5288590)

<a href="#geoGnomonic" name="geoGnomonic">#</a> d3.<b>geoGnomonic</b>()

[gnomonic](http://bl.ocks.org/mbostock/3757349)

<a href="#geoGringorten" name="geoGringorten">#</a> d3.<b>geoGringorten</b>()

[Gringorten](http://bl.ocks.org/mbostock/4362031)

<a href="#geoGuyou" name="geoGuyou">#</a> d3.<b>geoGuyou</b>()

[Guyou hemisphere-in-a-square](http://bl.ocks.org/mbostock/3763867)

<a href="#geoHammer" name="geoHammer">#</a> d3.<b>geoHammer</b>()

[Hammer](http://bl.ocks.org/mbostock/3712397), [Eckert–Greifendorff](http://bl.ocks.org/mbostock/4496212), [quartic authalic](http://bl.ocks.org/mbostock/4463175), [Briesemeister](http://bl.ocks.org/mbostock/4519926)

<a href="#geoHammerRetroazimuthal" name="geoHammerRetroazimuthal">#</a> d3.<b>geoHammerRetroazimuthal</b>()

[Hammer retroazimuthal](http://bl.ocks.org/mbostock/4459130)

<a href="#geoHealpix" name="geoHealpix">#</a> d3.<b>geoHealpix</b>()

[HEALPix](http://bl.ocks.org/mbostock/4463237)

<a href="#geoHill" name="geoHill">#</a> d3.<b>geoHill</b>()

[Hill eucyclic](http://bl.ocks.org/mbostock/4479513), [Maurer No. 73](http://bl.ocks.org/mbostock/4479547)

<a href="#geoHomolosine" name="geoHomolosine">#</a> d3.<b>geoHomolosine</b>()

[Goode homolosine](http://bl.ocks.org/mbostock/3734330)

<a href="#geoKavrayskiy7" name="geoKavrayskiy7">#</a> d3.<b>geoKavrayskiy7</b>()

[Kavrayskiy VII](http://bl.ocks.org/mbostock/3710082)

<a href="#geoLagrange" name="geoLagrange">#</a> d3.<b>geoLagrange</b>()

[Lagrange conformal](http://bl.ocks.org/mbostock/3797591)

<a href="#geoLarrivee" name="geoLarrivee">#</a> d3.<b>geoLarrivee</b>()

[Larrivée](http://bl.ocks.org/mbostock/3719042)

<a href="#geoLaskowski" name="geoLaskowski">#</a> d3.<b>geoLaskowski</b>()

[Laskowski tri-optimal](http://bl.ocks.org/mbostock/4489342)

<a href="#geoLittrow" name="geoLittrow">#</a> d3.<b>geoLittrow</b>()

[Littrow](http://bl.ocks.org/mbostock/4459071)

<a href="#geoLoximuthal" name="geoLoximuthal">#</a> d3.<b>geoLoximuthal</b>()

[loximuthal](http://bl.ocks.org/mbostock/3867220)

<a href="#geoMercator" name="geoMercator">#</a> d3.<b>geoMercator</b>()

[Mercator](http://bl.ocks.org/mbostock/3757132)

<a href="#geoMiller" name="geoMiller">#</a> d3.<b>geoMiller</b>()

[Miller](http://bl.ocks.org/mbostock/3734333)

<a href="#geoModifiedStereographic" name="geoModifiedStereographic">#</a> d3.<b>geoModifiedStereographic</b>()

[modified stereographic](http://www.jasondavies.com/maps/modified-stereographic/)

<a href="#geoMollweide" name="geoMollweide">#</a> d3.<b>geoMollweide</b>()

[Mollweide](http://bl.ocks.org/mbostock/3734336), [Atlantis](http://bl.ocks.org/mbostock/4519975)

<a href="#geoMtFlatPolarParabolic" name="geoMtFlatPolarParabolic">#</a> d3.<b>geoMtFlatPolarParabolic</b>()

[McBryde–Thomas flat-polar parabolic](http://bl.ocks.org/mbostock/4465130)

<a href="#geoMtFlatPolarQuartic" name="geoMtFlatPolarQuartic">#</a> d3.<b>geoMtFlatPolarQuartic</b>()

[McBryde–Thomas flat-polar quartic](http://bl.ocks.org/mbostock/4465137)

<a href="#geoMtFlatPolarSinusoidal" name="geoMtFlatPolarSinusoidal">#</a> d3.<b>geoMtFlatPolarSinusoidal</b>()

[McBryde–Thomas flat-polar sinusoidal](http://bl.ocks.org/mbostock/4465140)

<a href="#geoNaturalEarth" name="geoNaturalEarth">#</a> d3.<b>geoNaturalEarth</b>()

[Natural Earth](http://bl.ocks.org/mbostock/4479477)

<a href="#geoNellHammer" name="geoNellHammer">#</a> d3.<b>geoNellHammer</b>()

[Nell–Hammer](http://bl.ocks.org/mbostock/3734342)

<a href="#geoOrthographic" name="geoOrthographic">#</a> d3.<b>geoOrthographic</b>()

[orthographic](http://bl.ocks.org/mbostock/3757125)

<a href="#geoPatterson" name="geoPatterson">#</a> d3.<b>geoPatterson</b>()

[patterson](http://bl.ocks.org/mbostock/d4021aa4dccfd65edffd)

<a href="#geoPeirceQuincuncial" name="geoPeirceQuincuncial">#</a> d3.<b>geoPeirceQuincuncial</b>()

[Pierce quincuncial](http://bl.ocks.org/mbostock/4310087)

<a href="#geoPolyconic" name="geoPolyconic">#</a> d3.<b>geoPolyconic</b>()

[polyconic](http://bl.ocks.org/mbostock/3734343)

<a href="#geoRectangularPolyconic" name="geoRectangularPolyconic">#</a> d3.<b>geoRectangularPolyconic</b>()

[rectangular polyconic](http://bl.ocks.org/mbostock/5230202)

<a href="#geoRobinson" name="geoRobinson">#</a> d3.<b>geoRobinson</b>()

[Robinson](http://bl.ocks.org/mbostock/3710566)

<a href="#geoSatellite" name="geoSatellite">#</a> d3.<b>geoSatellite</b>()

[satellite (tilted perpsective)](http://bl.ocks.org/mbostock/3790444)

<a href="#geoSinusoidal" name="geoSinusoidal">#</a> d3.<b>geoSinusoidal</b>()

[sinusoidal](http://bl.ocks.org/mbostock/3712399)

<a href="#geoSinuMollweide" name="geoSinuMollweide">#</a> d3.<b>geoSinuMollweide</b>()

[Sinu-Mollweide](http://bl.ocks.org/mbostock/4319903)

<a href="#geoStereographic" name="geoStereographic">#</a> d3.<b>geoStereographic</b>()

[stereographic](http://bl.ocks.org/mbostock/3757137)

<a href="#geoTimes" name="geoTimes">#</a> d3.<b>geoTimes</b>()

[Times](http://bl.ocks.org/mbostock/5230564)

<a href="#geoTransverseMercator" name="geoTransverseMercator">#</a> d3.<b>geoTransverseMercator</b>()

[transverse Mercator](http://bl.ocks.org/mbostock/5126418)

<a href="#geoTwoPointAzimuthal" name="geoTwoPointAzimuthal">#</a> d3.<b>geoTwoPointAzimuthal</b>()

[two-point azimuthal](https://www.jasondavies.com/maps/two-point-azimuthal/)

<a href="#geoTwoPointEquidistant" name="geoTwoPointEquidistant">#</a> d3.<b>geoTwoPointEquidistant</b>()

[two-point equidistant](https://www.jasondavies.com/maps/two-point-equidistant/)

<a href="#geoVanDerGrinten" name="geoVanDerGrinten">#</a> d3.<b>geoVanDerGrinten</b>()

[Van der Grinten](http://bl.ocks.org/mbostock/3796831)

<a href="#geoVanDerGrinten2" name="geoVanDerGrinten2">#</a> d3.<b>geoVanDerGrinten2</b>()

[Van der Grinten II](http://bl.ocks.org/mbostock/5230571)

<a href="#geoVanDerGrinten3" name="geoVanDerGrinten3">#</a> d3.<b>geoVanDerGrinten3</b>()

[Van der Grinten III](http://bl.ocks.org/mbostock/5230580)

<a href="#geoVanDerGrinten4" name="geoVanDerGrinten4">#</a> d3.<b>geoVanDerGrinten4</b>()

[Van der Grinten IV](http://bl.ocks.org/mbostock/4489365)

<a href="#geoWagner4" name="geoWagner4">#</a> d3.<b>geoWagner4</b>()

[Wagner IV, Putniṇš P2´](http://bl.ocks.org/mbostock/4487674)

<a href="#geoWagner6" name="geoWagner6">#</a> d3.<b>geoWagner6</b>()

[Wagner VI](http://bl.ocks.org/mbostock/3710148)

<a href="#geoWagner7" name="geoWagner7">#</a> d3.<b>geoWagner7</b>()

[Wagner VII](http://bl.ocks.org/mbostock/4465109)

<a href="#geoWiechel" name="geoWiechel">#</a> d3.<b>geoWiechel</b>()

[Wiechel](http://bl.ocks.org/mbostock/4463155)

<a href="#geoWinkel3" name="geoWinkel3">#</a> d3.<b>geoWinkel3</b>()

[Winkel tripel](http://bl.ocks.org/mbostock/3682676)
