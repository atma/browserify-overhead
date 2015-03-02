# Calculate the browserify runtime overhead

## The process

Has been prepared the next five scenarios:

* small - tiny main module with a single submodule and minimal functional content
* subdeps - main module has a single dependency that requires two additional submodules
* many - single main module that requires many small submodules
* large - single main module that requires `lodash` for it's functionality
* prod - near production, main module requires `jQuery` and `Backbone` which has
        additional dependency on `underscore`

Original files were minified using `uglify-js` per scenario, for every
minified file has been generated source map and referenced in a resulting file.

Every brofserify bundle was generated indicating only the module's entry file,
all dependencies has been resolved automatically. Source maps were generated as
well.

Functionality of every resulting bundle was verified in a real browser using
[beefy](http://didact.us/beefy/). No errors were produced and all worked as
expected.


## Browserifyify task

The task was a pretty simple:

* Initialize `browserify` indicating only the module's entry file as a source
* Generate the bundle
* Create a transformable stream from the result
* Initialize source maps
* Uglify
* Extract and write source map
* Log the size
* Write the result

**Note**: All resulting files has reference to a source map, can be removed for
production to save a few bytes more.


## Alternatives

There are many alternative methods to generate browser ready code. But in fact
all of that are using a combination of `browserify` and `uglify`, the
difference can be only in source maps generation and concatenation.

One of the popular solution is a [minifyify](https://github.com/ben-ng/minifyify)
plugin for `browserify`. Typical configuration can look like this:

```js
gulp.task('browserifyify', function() {

    return browserify({
            // Source files
            entries: ['./src/some/entry.js'],
            // This one is important for source maps generation
            debug: true
        })
        // minifyify plugin configuration
        .plugin('minifyify', {
            // Path including final filename to where to put a source map
            output: './build/small/bundle2.js.map',
            // The reference to source map to put in minified JS file, shold be
            // relative to original file
            map: 'bundle2.js.map',
            // Minify the output?
            minify: true,
            // Configuration object that will be passed to an uglify
            uglify: {
                output: {
                    beautify: false
                }
            }
        })
        // Do the bundle
        .bundle()
        // Creates a through stream from the result with a destination filename
        .pipe(source('bundle2.js'))
        // Creates a transform stream
        .pipe(buffer())
        // Log the size
        .pipe(size())
        // Write the output
        .pipe(gulp.dest('./build/small'));
});
```

The result was a little bit strange, looks like `minifyify` concatenates the
minified files instead of minify concatenated ones. So the resulting file always
has a double `\n` between concatenated files and randomly inserted `\n` that
cannot be handled with `uglify` configuration.

Since the original configuration produces the best minification and has more
predicable result all ones like this were removed in prior to an original.


## Results

| Scenario | Original size (kb) | Original size gzipped (kb) | Bundled size (kb) | Bundled size gzipped (kb) | Overhead (kb) | Overhead gzipped (kb) |
| -------- | -----------------: | -------------------------: | ----------------: | ------------------------: | ------------: | --------------------: |
| small    | 0.44               | 0.29                       | 0.82              | 0.5                       | 0.38          | 0.21                  |
| subdeps  | 0.73               | 0.36                       | 1.19              | 0.58                      | 0.46          | 0.22                  |
| many     | 1.85               | 0.38                       | 2.3               | 0.7                       | 0.45          | 0.32                  |
| large    | 49.1               | 17.52                      | 49.6              | 17.7                      | 0.5           | 0.18                  |
| prod     | 120.01             | 41.22                      | 120.49            | 41.35                     | 0.48          | 0.13                  |


### Resulting overhead chart

![Runtime overhead chart](https://raw.github.com/atma/browserify-overhead/master/overhead-chart.png)

### Overhead percentage

Overhead has almost fixed size and in a huge bundles should be insignificant.
Below is a table of overhead size relative to an original size.

| Scenario | Overhead (%)  | Overhead gzipped (%)  |
| -------- | ------------: | --------------------: |
| small    | 86.36         | 72.41                 |
| subdeps  | 63.01         | 61.11                 |
| many     | 24.32         | 84.21                 |
| large    | 1.02          | 1.03                  |
| prod     | 0.40          | 0.32                  |


## Conclusion

Official numbers are: *415b + 25b per module + 6b per dependency*, it is a pure
runtime overhead. In our case we are using the difference between an original but
minified files and a transformed ones minified in the same way.

Why? When an original code has globals its cannot be mangled, browseify envelopes
just all the files (modules) in a *module definition wrapper* so every variable
can be mangled if it is not exposed using `exports`. In *many* scenario was
expected a significant growth of a resulting file size but thanks to this fact
the result was better than expected.

Also browserify should detect the using of `require` in a bundle and never
duplicate it. This fact was confirmed, every bundle has only 415b of
require's overhead per bundle. So do not forget to use `--external` when some
*shared* bundle is already exist and contain require definition to handle files'
size wisely.

It is very easy to use the JS files from *npm* repos. In a *large* scenario
`lodash` lib was installed using `npm install lodash` and successfully included
in a browser ready bundle.

**Very approximated numbers**: the final minified runtime overhead is *between 0.4kb
and 0.5kb* and very close to *0.2kb-0.3kb* when gzipped.
