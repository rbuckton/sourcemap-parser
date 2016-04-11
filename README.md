# SourceMap Parser

## Installing
For the latest version:

```cmd
npm install sourcemap-parser
```

## Documentation
*Forthcoming*

## API
```ts
export interface IndexMap {
    version: number;
    file: string;
    sections: Section[];
}
export interface Section {
    offset: {
        line: number;
        column: number;
    };
    url?: string;
    map?: SourceMap;
}
export interface SourceMap {
    version: number;
    file: string;
    sourceRoot: string;
    sources: string[];
    names: string[];
    mappings: string;
    sourcesContent?: string[];
    x_ms_scopes?: string;
    x_ms_locals?: string;
    x_ms_mediaTypes?: string[];
    x_ms_sourceMediaTypes?: string;
}
export interface ParsedSection {
    sectionIndex: number;
    generatedLine: number;
    generatedColumn: number;
    generatedFile?: string;
}
export interface Mapping {
    mappingIndex: number;
    sectionIndex: number;
    sectionMappingIndex: number;
    generatedLine: number;
    sectionGeneratedLine: number;
    generatedColumnOffset: number;
    generatedColumn: number;
    sectionGeneratedColumn: number;
    sourceIndexOffset?: number;
    source?: Source;
    sourceLineOffset?: number;
    sourceLine?: number;
    sourceColumnOffset?: number;
    sourceColumn?: number;
    nameIndexOffset?: number;
    name?: Name;
}
export interface GeneratedFile {
    url: string;
    content: string;
    lines: GeneratedLine[];
}
export interface GeneratedLine {
    line: number;
    segments: GeneratedSegment[];
}
export interface GeneratedSegment {
    mapping?: Mapping;
    line: number;
    startColumn: number;
    endColumn: number;
}
export interface Source {
    sourceIndex: number;
    sectionIndex: number;
    sectionSourceIndex: number;
    url: string;
    mediaType?: string;
}
export interface SourceFile {
    url: string;
    content: string;
    lines: SourceLine[];
    source: Source;
}
export interface SourceLine {
    line: number;
    segments: SourceSegment[];
}
export interface SourceSegment {
    mappings?: Mapping[];
    line: number;
    startColumn: number;
    endColumn: number;
    children?: SourceSegment[];
}
export interface Name {
    nameIndex: number;
    sectionIndex: number;
    sectionNameIndex: number;
    text: string;
}
export interface Scope {
    scopeIndex: number;
    sectionIndex: number;
    sectionScopeIndex: number;
    parent: Scope;
    startLine: number;
    startColumn: number;
    sectionStartLine: number;
    sectionStartColumn: number;
    endLine: number;
    endColumn: number;
    sectionEndLine: number;
    sectionEndColumn: number;
    nested: Scope[];
    locals: Local[];
}
export interface Local {
    localIndex: number;
    sectionIndex: number;
    sectionLocalIndex: number;
    scope: Scope;
    generatedName: Name;
    sourceName?: Name;
    isHidden: boolean;
    isRenamed: boolean;
}
export interface FileHost {
    readFile(name: string, encoding?: string): string;
    resolve(name: string, relativeName: string): string;
}
export interface ParsedSourceMap {
    mapFile: string;
    generatedFile: string;
    isIndexMap: boolean;
    getGeneratedContent(): string;
    getGeneratedFile(): GeneratedFile;
    getIndexMap(): IndexMap;
    getIndexMapContent(): string;
    getSourceMaps(): SourceMap[];
    getSourceMap(sectionIndex: number): SourceMap;
    getSourceMapContent(sectionIndex: number): string;
    getSourceMapGeneratedFileContent(sectionIndex: number): string;
    getSections(): ParsedSection[];
    getSection(sectionIndex: number): ParsedSection;
    getNames(): Name[];
    getNamesInSection(sectionIndex: number): Name[];
    getName(nameIndex: number): Name;
    getNameInSection(sectionIndex: number, sectionNameIndex: number): Name;
    getSources(): Source[];
    getSourcesInSection(sectionIndex: number): Source[];
    getSource(sourceIndex: number): Source;
    getSourceInSection(sectionIndex: number, sectionSourceIndex: number): Source;
    getSourceContent(sourceIndex: number): string;
    getSourceContentInSection(sectionIndex: number, sectionSourceIndex: number): string;
    getSourceFiles(): SourceFile[];
    getSourceFilesInSection(sectionIndex: number): SourceFile[];
    getSourceFile(sourceIndex: number): SourceFile;
    getSourceFileInSection(sectionIndex: number, sectionSourceIndex: number): SourceFile;
    getMappings(): Mapping[];
    getMappingsInSection(sectionIndex: number): Mapping[];
    getMapping(mappingIndex: number): Mapping;
    getMappingInSection(sectionIndex: number, sectionMappingIndex: number): Mapping;
    getMappingsAtGeneratedLine(generatedLine: number): Mapping[];
    getMappingAtGeneratedLocation(generatedLine: number, generatedColumn: number): Mapping;
    getMappingAtGeneratedLocationInSection(sectionIndex: number, sectionGeneratedLine: number, sectionGeneratedColumn: number): Mapping;
    getCandidateMappingsAtSourceLine(sourceIndex: number, sourceLine: number): Mapping[];
    getCandidateMappingsAtSourceLocation(sourceIndex: number, sourceLine: number, sourceColumn: number): Mapping[];
    getCandidateMappingsAtSourceLocationInSection(sectionIndex: number, sectionSourceIndex: number, sourceLine: number, sourceColumn: number): Mapping[];
    getScopes(topMost?: boolean): Scope[];
    getScopesInSection(sectionIndex: number, topMost?: boolean): Scope[];
    getScope(scopeIndex: number): Scope;
    getScopeInSection(sectionIndex: number, sectionScopeIndex: number): Scope;
    getNarrowestScopeAtGeneratedLocation(generatedLine: number, generatedColumn: number): Scope;
    getNarrowestScopeAtGeneratedLocationInSection(sectionIndex: number, sectionGeneratedLine: number, sectionGeneratedColumn: number): Scope;
    getCandidateNarrowestScopesAtSourceLocation(sourceIndex: number, sourceLine: number, sourceColumn: number): Scope[];
    getCandidateNarrowestScopesAtSourceLocationInSection(sectionIndex: number, sectionSourceIndex: number, sourceLine: number, sourceColumn: number): Scope[];
    getLocals(): Local[];
    getLocalsInSection(sectionIndex: number): Local[];
    getLocal(localIndex: number): Local;
    getLocalInSection(sectionIndex: number, sectionLocalIndex: number): Local;
    getLocalAtGeneratedLocationForGeneratedName(generatedLine: number, generatedColumn: number, generatedName: string): Local;
    getLocalAtGeneratedLocationInSectionForGeneratedName(sectionIndex: number, sectionGeneratedLine: number, sectionGeneratedColumn: number, generatedName: string): Local;
    getLocalAtGeneratedLocationForSourceName(generatedLine: number, generatedColumn: number, sourceName: string): Local;
    getLocalAtGeneratedLocationInSectionForSourceName(sectionIndex: number, sectionGeneratedLine: number, sectionGeneratedColumn: number, sourceName: string): Local;
    getCandidateLocalsAtSourceLocationForGeneratedName(sourceIndex: number, sourceLine: number, sourceColumn: number, generatedName: string): Local[];
    getCandidateLocalsAtSourceLocationForSourceName(sourceIndex: number, sourceLine: number, sourceColumn: number, sourceName: string): Local[];
    getCandidateLocalsAtSourceLocationInSectionForGeneratedName(sectionIndex: number, sectionSourceIndex: number, sourceLine: number, sourceColumn: number, generatedName: string): Local[];
    getCandidateLocalsAtSourceLocationInSectionForSourceName(sectionIndex: number, sectionSourceIndex: number, sourceLine: number, sourceColumn: number, sourceName: string): Local[];
    getMediaTypes(): string[];
    getMediaTypesInSection(sectionIndex: number): string[];
}
export declare function decode(mapFile: string, host?: FileHost): ParsedSourceMap;
```
