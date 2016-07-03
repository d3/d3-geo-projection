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

## API Reference

### Projections

<a href="#geoAitoff" name="geoAitoff">#</a> d3.<b>geoAitoff</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/aitoff.png" width="480" height="250">](http://bl.ocks.org/mbostock/3682698)

The Aitoff projection.

<a href="#geoAiry" name="geoAiry">#</a> d3.<b>geoAiry</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/airy.png" width="480" height="250">](http://bl.ocks.org/mbostock/5620807)

Airy’s minimum-error azimuthal projection.

<a href="airy_radius" name="airy_raidus">#</a> <i>airy</i>.<b>radius</b>([<i>radius</i>])

Defaults to 90°.

<a href="#geoAlbers" name="geoAlbers">#</a> d3.<b>geoAlbers</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo/master/img/albers.png" width="480" height="250">](http://bl.ocks.org/mbostock/3734308)

Alber’s [equal-area conic projection](#geoConicEqualArea); see [d3-geo](https://github.com/d3/d3-geo#geoAlbers).

<a href="#geoArmadillo" name="geoArmadillo">#</a> d3.<b>geoArmadillo</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/armadillo.png" width="480" height="250">](http://bl.ocks.org/mbostock/4463127)

The armadillo projection. The default center assumes the default [parallel](#armadillo_parallel) of 20° and should be changed if a different parallel is used. Note: requires clipping to the sphere.

<a href="#armadillo_parallel" name="armadillo_parallel">#</a> <i>armadillo</i>.<b>parallel</b>([<i>parallel</i>])

Defaults to 20°.

<a href="#geoAugust" name="geoAugust">#</a> d3.<b>geoAugust</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/august.png" width="480" height="250">](http://bl.ocks.org/mbostock/3797581)

August’s epicycloidal conformal projection.

<a href="#geoAzimuthalEqualArea" name="geoAzimuthalEqualArea">#</a> d3.<b>geoAzimuthalEqualArea</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo/master/img/azimuthalEqualArea.png" width="480" height="250">](http://bl.ocks.org/mbostock/3757101)

The Lambert azimuthal equal-area projection; see [d3-geo](https://github.com/d3/d3-geo#geoAzimuthalEqualArea).

<a href="#geoAzimuthalEquidistant" name="geoAzimuthalEquidistant">#</a> d3.<b>geoAzimuthalEquidistant</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo/master/img/azimuthalEquidistant.png" width="480" height="250">](http://bl.ocks.org/mbostock/3757110)

The azimuthal equidistant projection; see [d3-geo](https://github.com/d3/d3-geo#geoAzimuthalEquidistant).

<a href="#geoBaker" name="geoBaker">#</a> d3.<b>geoBaker</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/baker.png" width="480" height="250">](http://bl.ocks.org/mbostock/4476279)

The Baker Dinomic projection.

<a href="#geoBerghaus" name="geoBerghaus">#</a> d3.<b>geoBerghaus</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/berghaus.png" width="480" height="250">](http://bl.ocks.org/mbostock/4463049)

Berghaus’ star projection. The default center assumes the default [lobe number](#berghaus_lobes) of 5 and should be changed if a different number of lobes is used. Note: requires clipping to the sphere.

<a href="#berghaus_lobes" name="berghaus_lobes">#</a> <i>berghaus</i>.<b>lobes</b>([<i>lobes</i>])

If *lobes* is specified, sets the number of lobes in the resulting star, and returns this projection. If *lobes* is not specified, returns the current lobe number, which defaults to 5.

<a href="#geoBoggs" name="geoBoggs">#</a> d3.<b>geoBoggs</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/boggs.png" width="480" height="250">](http://bl.ocks.org/mbostock/4481220)

The Boggs eumorphic projection. More commonly used in [interrupted form](http://bl.ocks.org/mbostock/4481265).

<a href="#geoBonne" name="geoBonne">#</a> d3.<b>geoBonne</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/bonne.png" width="480" height="250">](http://bl.ocks.org/mbostock/3734313)

The Bonne pseudoconical equal-area projection. The [Werner projection](http://bl.ocks.org/mbostock/a7ae83252305ed4d54d4) is a limiting form of the Bonne projection with a standard parallel at ±90°. The default center assumes the default [parallel](#bonne_parallel) of 45° and should be changed if a different parallel is used.

<a href="#bonne_parallel" name="bonne_parallel">#</a> <i>bonne</i>.<b>parallel</b>([<i>parallel</i>])

Defaults to 45°.

<a href="#geoBottomley" name="geoBottomley">#</a> d3.<b>geoBottomley</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/bottomley.png" width="480" height="250">](http://bl.ocks.org/mbostock/ad2d520dd26dcc5af13b)

The [Bottomley projection](http://cybergeo.revues.org/3977) “draws lines of latitude as concentric circular arcs, with arc lengths equal to their lengths on the globe, and placed symmetrically and equally spaced across the vertical central meridian.”

<a href="#bottomley_fraction" name="bottomley_fraction">#</a> <i>bottomley</i>.<b>fraction</b>([<i>fraction</i>])

Defaults to 0.5, corresponding to a sin(ψ) where ψ = π/6.

<a href="#geoBromley" name="geoBromley">#</a> d3.<b>geoBromley</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/bromley.png" width="480" height="250">](http://bl.ocks.org/mbostock/4487695)

The Bromley projection is a rescaled [Mollweide projection](#geoMollweide).

<a href="#geoChamberlin" name="geoChamberlin">#</a> d3.<b>geoChamberlin</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/chamberlin.png" width="480" height="250">](http://bl.ocks.org/mbostock/5625053)

The Chamberlin trimetric projection. This method does not support *projection*.rotate: the [three reference points](#chamberlin_points) implicitly determine a fixed rotation.

<a href="#chamberlin_points" name="chamberlin_points">#</a> <i>chamberlin</i>.<b>points</b>([<i>points</i>])

Defaults to [[-20, 20], [20, 20], [0, -43.16]].

<a href="#geoCollignon" name="geoCollignon">#</a> d3.<b>geoCollignon</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/collignon.png" width="480" height="250">](http://bl.ocks.org/mbostock/3734316)

The Collignon equal-area pseudocylindrical projection. This projection is used in the polar areas of the [HEALPix projection](#geoHealpix).

<a href="#geoConicConformal" name="geoConicConformal">#</a> d3.<b>geoConicConformal</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo/master/img/conicConformal.png" width="480" height="250">](http://bl.ocks.org/mbostock/3734321)

The Lambert conformal conic projection; see [d3-geo](https://github.com/d3/d3-geo#geoConicConformal).

<a href="#geoConicEqualArea" name="geoConicEqualArea">#</a> d3.<b>geoConicEqualArea</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo/master/img/conicEqualArea.png" width="480" height="250">](http://bl.ocks.org/mbostock/3734308)

Alber’s conic equal-area projection; see [d3-geo](https://github.com/d3/d3-geo#geoConicEqualArea).

<a href="#geoConicEquidistant" name="geoConicEquidistant">#</a> d3.<b>geoConicEquidistant</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo/master/img/conicEquidistant.png" width="480" height="250">](http://bl.ocks.org/mbostock/3734317)

The conic equidistant projection; see [d3-geo](https://github.com/d3/d3-geo#geoConicEquidistant).

<a href="#geoCraig" name="geoCraig">#</a> d3.<b>geoCraig</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/craig.png" width="480" height="250">](http://bl.ocks.org/mbostock/4459466)

The Craig retroazimuthal projection. Note: this projection tends to [fold over itself](http://bl.ocks.org/mbostock/4459716) if the [standard parallel](#craig_parallel) is non-zero; we have not yet implemented the necessary advanced clipping to avoid overlap.

<a href="#craig_parallel" name="craig_parallel">#</a> <i>craig</i>.<b>parallel</b>([<i>parallel</i>])

Defaults to 0°.

<a href="#geoCraster" name="geoCraster">#</a> d3.<b>geoCraster</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/craster.png" width="480" height="250">](http://bl.ocks.org/mbostock/4465118)

The Craster parabolic projection; also known as Putniņš P4.

<a href="#geoCylindricalEqualArea" name="geoCylindricalEqualArea">#</a> d3.<b>geoCylindricalEqualArea</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/cylindricalEqualArea.png" width="480" height="250">](http://bl.ocks.org/mbostock/3712408)

The cylindrical equal-area projection. Depending on the chosen [parallel](#cylindricalEqualArea_parallel), this projection is also known as the Lambert cylindrical equal-area (0°), [Gall–Peters](http://bl.ocks.org/mbostock/3946824) (45°), [Hobo–Dyer](http://bl.ocks.org/mbostock/4476487) (37.5°), and [Tobler world-in-a-square](http://bl.ocks.org/mbostock/4476496) (~55.654°).

<a href="#cylindricalEqualArea_parallel" name="cylindricalEqualArea_parallel">#</a> <i>cylindricalEqualArea</i>.<b>parallel</b>([<i>parallel</i>])

Defaults to approximately 38.58°, fitting the world in a 960×500 rectangle.

<a href="#geoCylindricalStereographic" name="geoCylindricalStereographic">#</a> d3.<b>geoCylindricalStereographic</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/cylindricalStereographic.png" width="480" height="250">](http://bl.ocks.org/mbostock/5234763)

The cylindrical stereographic projection. Depending on the chosen [parallel](#cylindricalStereographic_parallel), this projection is also known as Braun’s stereographic (0°) and Gall’s stereographic (45°).

<a href="#cylindricalStereographic_parallel" name="cylindricalStereographic_parallel">#</a> <i>cylindricalStereographic</i>.<b>parallel</b>([<i>parallel</i>])

Defaults to 0°.

<a href="#geoEckert1" name="geoEckert1">#</a> d3.<b>geoEckert1</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/eckert1.png" width="480" height="250">](http://bl.ocks.org/mbostock/3734322)

The Eckert I projection.

<a href="#geoEckert2" name="geoEckert2">#</a> d3.<b>geoEckert2</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/eckert2.png" width="480" height="250">](http://bl.ocks.org/mbostock/3734324)

The Eckert II projection.

<a href="#geoEckert3" name="geoEckert3">#</a> d3.<b>geoEckert3</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/eckert3.png" width="480" height="250">](http://bl.ocks.org/mbostock/3734325)

The Eckert III projection.

<a href="#geoEckert4" name="geoEckert4">#</a> d3.<b>geoEckert4</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/eckert4.png" width="480" height="250">](http://bl.ocks.org/mbostock/3734327)

The Eckert IV projection.

<a href="#geoEckert5" name="geoEckert5">#</a> d3.<b>geoEckert5</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/eckert5.png" width="480" height="250">](http://bl.ocks.org/mbostock/3734328)

The Eckert V projection.

<a href="#geoEckert6" name="geoEckert6">#</a> d3.<b>geoEckert6</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/eckert6.png" width="480" height="250">](http://bl.ocks.org/mbostock/3734329)

The Eckert VI projection.

<a href="#geoEisenlohr" name="geoEisenlohr">#</a> d3.<b>geoEisenlohr</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/eisenlohr.png" width="480" height="250">](http://bl.ocks.org/mbostock/3797585)

The Eisenlohr conformal projection.

<a href="#geoEquirectangular" name="geoEquirectangular">#</a> d3.<b>geoEquirectangular</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo/master/img/equirectangular.png" width="480" height="250">](http://bl.ocks.org/mbostock/3757119)

The equirectangular (plate carrée) projection; see [d3-geo](https://github.com/d3/d3-geo#geoEquirectangular). The [Cassini projection](http://bl.ocks.org/mbostock/5695142) is the transverse aspect of the equirectangular projection.

<a href="#geoFahey" name="geoFahey">#</a> d3.<b>geoFahey</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/fahey.png" width="480" height="250">](http://bl.ocks.org/mbostock/4731228)

The Fahey pseudocylindrical projection.

<a href="#geoFoucaut" name="geoFoucaut">#</a> d3.<b>geoFoucaut</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/foucaut.png" width="480" height="250">](https://www.jasondavies.com/maps/foucaut/)

Foucaut’s stereographic equivalent projection.

<a href="#geoGilbert" name="geoGilbert">#</a> d3.<b>geoGilbert</b>([<i>type</i>])

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/gilbert.png" width="480" height="250">](https://www.jasondavies.com/maps/gilbert/)

Gilbert’s two-world perspective projection. Wraps an instance of the specified projection *type*; if not specified, defaults to [d3.geoOrthographic](https://github.com/d3/d3-geo#geoOrthographic).

<a href="#geoGingery" name="geoGingery">#</a> d3.<b>geoGingery</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/gingery.png" width="480" height="250">](http://www.jasondavies.com/maps/gingery/)

The U.S.-centric Gingery world projection, as inspired by Cram’s Air Age. Note: requires clipping to the sphere.

<a href="#gingery_radius" name="gingery_radius">#</a> <i>gingery</i>.<b>radius</b>([<i>radius</i>])

Defaults to 30°.

<a href="#gingery_lobes" name="gingery_lobes">#</a> <i>gingery</i>.<b>lobes</b>([<i>lobes</i>])

Defaults to 6.

<a href="#geoGinzburg4" name="geoGinzburg4">#</a> d3.<b>geoGinzburg4</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/ginzburg4.png" width="480" height="250">](http://bl.ocks.org/mbostock/5288565)

The Ginzburg IV projection.

<a href="#geoGinzburg5" name="geoGinzburg5">#</a> d3.<b>geoGinzburg5</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/ginzburg5.png" width="480" height="250">](http://bl.ocks.org/mbostock/5288571)

The Ginzburg V projection.

<a href="#geoGinzburg6" name="geoGinzburg6">#</a> d3.<b>geoGinzburg6</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/ginzburg6.png" width="480" height="250">](http://bl.ocks.org/mbostock/5288577)

The Ginzburg VI projection.

<a href="#geoGinzburg8" name="geoGinzburg8">#</a> d3.<b>geoGinzburg8</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/ginzburg8.png" width="480" height="250">](http://bl.ocks.org/mbostock/5288583)

The Ginzburg VIII projection.

<a href="#geoGinzburg9" name="geoGinzburg9">#</a> d3.<b>geoGinzburg9</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/ginzburg9.png" width="480" height="250">](http://bl.ocks.org/mbostock/5288590)

The Ginzburg IX projection.

<a href="#geoGnomonic" name="geoGnomonic">#</a> d3.<b>geoGnomonic</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo/master/img/gnomonic.png" width="480" height="250">](http://bl.ocks.org/mbostock/3757349)

The gnomonic projection; see [d3-geo](https://github.com/d3/d3-geo#geoGnomonic).

<a href="#geoGringorten" name="geoGringorten">#</a> d3.<b>geoGringorten</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/gringorten.png" width="480" height="250">](http://bl.ocks.org/mbostock/4362031)

The Gringorten square equal-area projection, rearranged to give each hemisphere an entire square.

<a href="#geoGringortenQuincuncial" name="geoGringortenQuincuncial">#</a> d3.<b>geoGringortenQuincuncial</b>()

<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/gringortenQuincuncial.png" width="480" height="250">

The Gringorten square equal-area projection.

<a href="#geoGuyou" name="geoGuyou">#</a> d3.<b>geoGuyou</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/guyou.png" width="480" height="250">](http://bl.ocks.org/mbostock/3763867)

The Guyou hemisphere-in-a-square projection. See also [d3.geoPierceQuincuncial](#geoPierceQuincuncial).

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

[<img src="https://raw.githubusercontent.com/d3/d3-geo/master/img/mercator.png" width="480" height="250">](http://bl.ocks.org/mbostock/3757132)

The spherical Mercator projection; see [d3-geo](https://github.com/d3/d3-geo#geoMercator).

<a href="#geoMiller" name="geoMiller">#</a> d3.<b>geoMiller</b>()

[Miller](http://bl.ocks.org/mbostock/3734333)

<a href="#geoModifiedStereographic" name="geoModifiedStereographic">#</a> d3.<b>geoModifiedStereographic</b>()

[modified stereographic](http://www.jasondavies.com/maps/modified-stereographic/)

<a href="#geoMollweide" name="geoMollweide">#</a> d3.<b>geoMollweide</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/mollweide.png" width="480" height="250">](http://bl.ocks.org/mbostock/3734336)

The equal-area, pseudocylindrical Mollweide projection. The oblique aspect is known as the [Atlantis projection](http://bl.ocks.org/mbostock/4519975). [Goode’s interrupted Mollweide](http://bl.ocks.org/mbostock/4498187) is also widely known.

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

[<img src="https://raw.githubusercontent.com/d3/d3-geo/master/img/orthographic.png" width="480" height="250">](http://bl.ocks.org/mbostock/3757125)

The orthographic projection; see [d3-geo](https://github.com/d3/d3-geo#geoOrthographic).

<a href="#geoPatterson" name="geoPatterson">#</a> d3.<b>geoPatterson</b>()

[patterson](http://bl.ocks.org/mbostock/d4021aa4dccfd65edffd)

<a href="#geoPierceQuincuncial" name="geoPierceQuincuncial">#</a> d3.<b>geoPierceQuincuncial</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/pierceQuincuncial.png" width="480" height="250">](http://bl.ocks.org/mbostock/4310087)

The Pierce quincuncial projection is the quincuncial form of [d3.geoGuyou](#geoGuyou).

<a href="#geoPolyconic" name="geoPolyconic">#</a> d3.<b>geoPolyconic</b>()

[polyconic](http://bl.ocks.org/mbostock/3734343)

<a href="#geoRectangularPolyconic" name="geoRectangularPolyconic">#</a> d3.<b>geoRectangularPolyconic</b>()

[rectangular polyconic](http://bl.ocks.org/mbostock/5230202)

<a href="#geoRobinson" name="geoRobinson">#</a> d3.<b>geoRobinson</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/robinson.png" width="480" height="250">](http://bl.ocks.org/mbostock/3710566)

The Robinson projection.

<a href="#geoSatellite" name="geoSatellite">#</a> d3.<b>geoSatellite</b>()

[satellite (tilted perpsective)](http://bl.ocks.org/mbostock/3790444)

<a href="#geoSinusoidal" name="geoSinusoidal">#</a> d3.<b>geoSinusoidal</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/sinusoidal.png" width="480" height="250">](http://bl.ocks.org/mbostock/3712399)

The sinusoidal projection.

<a href="#geoSinuMollweide" name="geoSinuMollweide">#</a> d3.<b>geoSinuMollweide</b>()

[Sinu-Mollweide](http://bl.ocks.org/mbostock/4319903)

<a href="#geoStereographic" name="geoStereographic">#</a> d3.<b>geoStereographic</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo/master/img/stereographic.png" width="480" height="250">](http://bl.ocks.org/mbostock/3757137)

The stereographic projection; see [d3-geo](https://github.com/d3/d3-geo#geoStereographic).

<a href="#geoTimes" name="geoTimes">#</a> d3.<b>geoTimes</b>()

[Times](http://bl.ocks.org/mbostock/5230564)

<a href="#geoTransverseMercator" name="geoTransverseMercator">#</a> d3.<b>geoTransverseMercator</b>()

[<img src="https://raw.githubusercontent.com/d3/d3-geo/master/img/transverseMercator.png" width="480" height="250">](http://bl.ocks.org/mbostock/5126418)

The transverse spherical Mercator projection; see [d3-geo](https://github.com/d3/d3-geo#geoTransverseMercator).

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

[<img src="https://raw.githubusercontent.com/d3/d3-geo-projection/4/img/winkel3.png" width="480" height="250">](http://bl.ocks.org/mbostock/3682676)

The Winkel tripel projection.

### Raw Projections

Raw projections are typically passed to the [d3.geoProjection](#geoProjection) constructor. They are exposed here to facilitate the derivation of related projections.

<a href="#project" name="project">#</a> <i>project</i>(<i>lambda</i>, <i>phi</i>)

…

<a href="#project_invert" name="project_invert">#</a> <i>project</i>.<b>invert</b>(<i>x</i>, <i>y</i>)

…

<a href="#geoAitoffRaw" name="geoAitoffRaw">#</a> d3.<b>geoAitoffRaw</b>

…

<a href="#geoAiryRaw" name="geoAiryRaw">#</a> d3.<b>geoAiryRaw</b>(<i>beta</i>)

…

<a href="#geoArmadilloRaw" name="geoArmadilloRaw">#</a> d3.<b>geoArmadilloRaw</b>(<i>phi0</i>)

…

<a href="#geoAugustRaw" name="geoAugustRaw">#</a> d3.<b>geoAugustRaw</b>

…

<a href="#geoBakerRaw" name="geoBakerRaw">#</a> d3.<b>geoBakerRaw</b>

…

<a href="#geoBerghausRaw" name="geoBerghausRaw">#</a> d3.<b>geoBerghausRaw</b>(<i>lobes</i>)

…

<a href="#geoBoggsRaw" name="geoBoggsRaw">#</a> d3.<b>geoBoggsRaw</b>

…

<a href="#geoBonneRaw" name="geoBonneRaw">#</a> d3.<b>geoBonneRaw</b>

…

<a href="#geoBottomleyRaw" name="geoBottomleyRaw">#</a> d3.<b>geoBottomleyRaw</b>(<i>psi</i>)

…

<a href="#geoBromleyRaw" name="geoBromleyRaw">#</a> d3.<b>geoBromleyRaw</b>

…

<a href="#geoChamberlinRaw" name="geoChamberlinRaw">#</a> d3.<b>geoChamberlinRaw</b>

…

<a href="#geoCollignonRaw" name="geoCollignonRaw">#</a> d3.<b>geoCollignonRaw</b>

…

<a href="#geoCraigRaw" name="geoCraigRaw">#</a> d3.<b>geoCraigRaw</b>(<i>phi</i>)

…

<a href="#geoCrasterRaw" name="geoCrasterRaw">#</a> d3.<b>geoCrasterRaw</b>

…

<a href="#geoCylindricalEqualAreaRaw" name="geoCylindricalEqualAreaRaw">#</a> d3.<b>geoCylindricalEqualAreaRaw</b>

…

<a href="#geoCylindricalStereographicRaw" name="geoCylindricalStereographicRaw">#</a> d3.<b>geoCylindricalStereographicRaw</b>

…

<a href="#geoEckert1Raw" name="geoEckert1Raw">#</a> d3.<b>geoEckert1Raw</b>

…

<a href="#geoEckert2Raw" name="geoEckert2Raw">#</a> d3.<b>geoEckert2Raw</b>

…

<a href="#geoEckert3Raw" name="geoEckert3Raw">#</a> d3.<b>geoEckert3Raw</b>

…

<a href="#geoEckert4Raw" name="geoEckert4Raw">#</a> d3.<b>geoEckert4Raw</b>

…

<a href="#geoEckert5Raw" name="geoEckert5Raw">#</a> d3.<b>geoEckert5Raw</b>

…

<a href="#geoEckert6Raw" name="geoEckert6Raw">#</a> d3.<b>geoEckert6Raw</b>

…

<a href="#geoFaheyRaw" name="geoFaheyRaw">#</a> d3.<b>geoFaheyRaw</b>

…

<a href="#geoGingeryRaw" name="geoGingeryRaw">#</a> d3.<b>geoGingeryRaw</b>(<i>rho</i>, <i>lobes</i>)

…

<a href="#geoGinzburg4Raw" name="geoGinzburg4Raw">#</a> d3.<b>geoGinzburg4Raw</b>

…

<a href="#geoGinzburg5Raw" name="geoGinzburg5Raw">#</a> d3.<b>geoGinzburg5Raw</b>

…

<a href="#geoGinzburg6Raw" name="geoGinzburg6Raw">#</a> d3.<b>geoGinzburg6Raw</b>

…

<a href="#geoGinzburg8Raw" name="geoGinzburg8Raw">#</a> d3.<b>geoGinzburg8Raw</b>

…

<a href="#geoGinzburg9Raw" name="geoGinzburg9Raw">#</a> d3.<b>geoGinzburg9Raw</b>

…

<a href="#geoMollweideRaw" name="geoMollweideRaw">#</a> d3.<b>geoMollweideRaw</b>

…

<a href="#geoSinusoidalRaw" name="geoSinusoidalRaw">#</a> d3.<b>geoSinusoidalRaw</b>

…

<a href="#geoWinkel3Raw" name="geoWinkel3Raw">#</a> d3.<b>geoWinkel3Raw</b>

…
